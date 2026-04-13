import json
import pandas as pd
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder

# 1. LOAD THE DATA
with open('master_training_data.json', 'r') as f:
    raw_data = json.load(f)

def flatten_features(feature_dict, prefix):
    """Turns nested JSON into a flat structure for the model."""
    flat = {}
    for k, v in feature_dict.items():
        if isinstance(v, dict):
            flat[f"{prefix}_{k}"] = v.get('default', str(v))
        else:
            flat[f"{prefix}_{k}"] = v
    return flat

# 2. THE CAPTURE PREP (Building the Table)
rows = []
for game in raw_data:
    row = {'target': 1 if game['winner'] == game['home_team'] else 0}
    row.update(flatten_features(game['home_features'], 'home'))
    row.update(flatten_features(game['away_features'], 'away'))
    rows.append(row)

df = pd.DataFrame(rows)

# 3. CLEANING (Removing non-predictive metadata like image links)
cols_to_drop = [c for c in df.columns if 'Logo' in c or 'date' in c]
df = df.drop(columns=cols_to_drop)

# Turn all text (Team names, Streaks, Divisions) into numbers for XGBoost
for col in df.select_dtypes(include=['object']).columns:
    df[col] = LabelEncoder().fit_transform(df[col].astype(str))

# 4. TRAINING (The Calculation)
X = df.drop('target', axis=1) # All the "Before" stats
y = df['target']             # The outcome

model = XGBClassifier(n_estimators=100, max_depth=5)
model.fit(X, y)

# 5. THE CAPTURE: Creating the physical file
# This is where the trained intelligence is stored.
model.save_model('nhl_win_predictor.json')

print("Job Finished: 'nhl_win_predictor.json' has been created.")