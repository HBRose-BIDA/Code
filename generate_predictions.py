import json
import pandas as pd
import os
from xgboost import XGBClassifier

REQUIRED_SCHEDULE_KEYS = ['target_date', 'schedule_dsn']
REQUIRED_PREDICTION_KEYS = ['training_dsn', 'model_dsn', 'predictions_log']


def load_prediction_configs(config_file='config.json'):
    with open(config_file, 'r') as f:
        config = json.load(f)

    schedule = config.get('schedule')
    prediction = config.get('prediction')

    if not isinstance(schedule, dict):
        raise ValueError("Missing required 'schedule' section in config.json")
    if not isinstance(prediction, dict):
        raise ValueError("Missing required 'prediction' section in config.json")

    missing_schedule = [k for k in REQUIRED_SCHEDULE_KEYS if k not in schedule]
    missing_prediction = [k for k in REQUIRED_PREDICTION_KEYS if k not in prediction]
    if missing_schedule:
        raise ValueError(f"Missing required schedule config keys: {', '.join(missing_schedule)}")
    if missing_prediction:
        raise ValueError(f"Missing required prediction config keys: {', '.join(missing_prediction)}")

    return schedule, prediction


try:
    schedule_config, prediction_config = load_prediction_configs()
except Exception as e:
    print(f"Configuration error: {e}")
    raise SystemExit(1)

model = XGBClassifier()
model.load_model(prediction_config['model_dsn'])
expected_features = model.get_booster().feature_names

# 2. LOAD DATA SOURCES
with open(prediction_config['training_dsn'], 'r') as f:
    history = json.load(f)
with open(schedule_config['schedule_dsn'], 'r') as f:
    schedule = json.load(f)

def get_latest_stats(team_abbr, history_data):
    for game in reversed(history_data):
        if game['home_team'] == team_abbr: return game['home_features']
        if game['away_team'] == team_abbr: return game['away_features']
    return None

def flatten_section(feature_dict, prefix):
    flat = {}
    if not feature_dict: return flat
    for k, v in feature_dict.items():
        if isinstance(v, dict):
            flat[f"{prefix}_{k}"] = v.get('default', str(v))
        else:
            flat[f"{prefix}_{k}"] = v
    return flat

# 3. CONSTRUCT INPUT DATA
processed_rows = []
valid_games = []

for game in schedule:
    h_stats = get_latest_stats(game['home'], history)
    a_stats = get_latest_stats(game['away'], history)
    
    if h_stats and a_stats:
        row = {}
        row.update(flatten_section(h_stats, 'home'))
        row.update(flatten_section(a_stats, 'away'))
        processed_rows.append(row)
        valid_games.append(game)

if not processed_rows:
    print("No stats found in history for these teams.")
    exit()

input_df = pd.DataFrame(processed_rows)

# 4. FEATURE ALIGNMENT
cols_to_drop = [c for c in input_df.columns if 'Logo' in c or 'date' in c]
input_df = input_df.drop(columns=cols_to_drop, errors='ignore')

for col in input_df.select_dtypes(include=['object']).columns:
    input_df[col] = pd.factorize(input_df[col])[0]

for col in expected_features:
    if col not in input_df.columns:
        input_df[col] = 0
input_df = input_df[expected_features]

# 5. EXECUTE PREDICTION
predictions = model.predict(input_df)
probs = model.predict_proba(input_df)

# 6. FEATURE IMPORTANCE (The "Why")
# We calculate which features moved the needle most across these games
importance = model.get_booster().get_score(importance_type='weight')
sorted_importance = sorted(importance.items(), key=lambda x: x[1], reverse=True)

# 7. PRINT & EXPORT RESULTS
export_data = []
print(f"\nNHL Predictions for {schedule_config['target_date']}:")
print("-" * 65)

for i, game in enumerate(valid_games):
    winner = game['home'] if predictions[i] == 1 else game['away']
    conf = probs[i].max()
    print(f"{game['away'] + ' @ ' + game['home']:<25} | Winner: {winner:<10} | {conf:.1%}")
    
    export_data.append({
        "pred_timestamp": pd.Timestamp.now().strftime('%Y-%m-%d %H:%M'),
        "game_date": schedule_config['target_date'],
        "matchup": f"{game['away']}@{game['home']}",
        "prediction": winner,
        "confidence": round(float(conf), 4)
    })

# --- NEW: Model Insight Section ---
print("\n" + "="*30)
print("MODEL DECISION INSIGHTS")
print("Top 5 factors influencing today's picks:")
for feat, score in sorted_importance[:5]:
    # Clean up the name for readability
    clean_name = feat.replace('home_', 'Home ').replace('away_', 'Away ').replace('_', ' ')
    print(f" - {clean_name:<30} (Weight: {score})")
print("="*30)

# Save to CSV
output_df = pd.DataFrame(export_data)
log_file = prediction_config['predictions_log']
header_needed = not os.path.isfile(log_file)
output_df.to_csv(log_file, mode='a', index=False, header=header_needed)
print(f"\nResults appended to {log_file}")