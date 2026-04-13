try:
    import requests
except Exception:
    requests = None
import json
import time
import sys
import argparse
from datetime import datetime, timedelta

CONFIG_FILE = "config.json"
REQUIRED_TRAINING_KEYS = [
    "start_date",
    "end_date",
    "output_dsn",
    "base_url",
    "simulate",
    "simulate_latency",
    "simulated_games_per_day",
]


def load_training_config(config_file=CONFIG_FILE):
    with open(config_file, 'r') as f:
        config = json.load(f)

    training = config.get('training')
    if not isinstance(training, dict):
        raise ValueError("Missing required 'training' section in config.json")

    missing = [k for k in REQUIRED_TRAINING_KEYS if k not in training]
    if missing:
        raise ValueError(f"Missing required training config keys: {', '.join(missing)}")

    return training

def get_training_data(training_config):
    start_date = training_config['start_date']
    end_date = training_config['end_date']
    output_file = training_config['output_dsn']
    base_url = training_config['base_url']
    simulate = bool(training_config['simulate'])
    simulate_latency = float(training_config['simulate_latency'])
    simulated_games_per_day = int(training_config['simulated_games_per_day'])

    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    master_records = []

    timings = []
    current_date = start
    while current_date <= end:
        date_str = current_date.strftime("%Y-%m-%d")
        history_date_str = (current_date - timedelta(days=1)).strftime("%Y-%m-%d")
        
        print(f"Syncing {date_str}...")

        try:
            day_start = time.perf_counter()

            # 1. FETCH OUTCOMES (The Filter)
            # Directly hitting the 'score' or 'schedule' endpoint
            if simulate:
                time.sleep(simulate_latency)
                # create simulated games for timing
                teams = ["FLA", "OTT", "NYR", "BOS", "MTL", "TOR"]
                games_data = []
                for i in range(simulated_games_per_day):
                    home = teams[i % len(teams)]
                    away = teams[(i + 1) % len(teams)]
                    games_data.append({
                        'id': f"{date_str}-{i}",
                        'gameState': 'OFF',
                        'homeTeam': {'abbrev': home, 'score': 2},
                        'awayTeam': {'abbrev': away, 'score': 1}
                    })
            else:
                score_start = time.perf_counter()
                score_resp = requests.get(f"{base_url}/score/{date_str}")
                score_elapsed = time.perf_counter() - score_start
                games_data = score_resp.json().get('games', [])

            if not games_data:
                current_date += timedelta(days=1)
                continue

            # 2. FETCH HISTORICAL SNAPSHOT (The Features)
            # Directly hitting the 'standings' endpoint for the day BEFORE
            # 2. FETCH HISTORICAL SNAPSHOT (The Features)
            if simulate:
                time.sleep(simulate_latency)
                # minimal standings entries for simulation
                standings_list = []
                for t in [g['homeTeam']['abbrev'] for g in games_data] + [g['awayTeam']['abbrev'] for g in games_data]:
                    standings_list.append({'teamAbbrev': {'default': t}, 'sim_stat': 1})
            else:
                stand_start = time.perf_counter()
                standings_resp = requests.get(f"{base_url}/standings/{history_date_str}")
                stand_elapsed = time.perf_counter() - stand_start
                standings_list = standings_resp.json().get('standings', [])
            
            # Convert list to a searchable dictionary: {"FLA": {all_stats}, "OTT": {all_stats}}
            standings_map = {s['teamAbbrev']['default']: s for s in standings_list}

            # 3. MERGE INTO ONE RECORD
            for game in games_data:
                # We only want finished games with a winner
                if game.get('gameState') == "OFF":
                    home_abr = game['homeTeam']['abbrev']
                    away_abr = game['awayTeam']['abbrev']
                    
                    # Logic: Determine winner based on score
                    home_score = game['homeTeam']['score']
                    away_score = game['awayTeam']['score']
                    winner = home_abr if home_score > away_score else away_abr

                    # Pull EVERYTHING for both teams from our map
                    home_stats = standings_map.get(home_abr)
                    away_stats = standings_map.get(away_abr)

                    if home_stats and away_stats:
                        record = {
                            "game_id": game['id'],
                            "date": date_str,
                            "home_team": home_abr,
                            "away_team": away_abr,
                            "home_features": home_stats, # ALL variables
                            "away_features": away_stats, # ALL variables
                            "winner": winner
                        }
                        master_records.append(record)

            day_elapsed = time.perf_counter() - day_start
            timings.append({'date': date_str, 'seconds': day_elapsed, 'games': len(games_data)})

        except Exception as e:
            print(f"Error on {date_str}: {e}")

        current_date += timedelta(days=1)
        time.sleep(1) # Protect the API

    # 4. FINAL WRITE
    with open(output_file, 'w') as f:
        json.dump(master_records, f, indent=4)
    
    # Summary stats
    total_days = len(timings)
    total_seconds = sum(t['seconds'] for t in timings)
    avg_sec = (total_seconds / total_days) if total_days else 0
    print(f"Done. {len(master_records)} records saved.")
    print(f"Processed {total_days} days in {total_seconds:.2f}s (avg {avg_sec:.2f}s/day)")
    if avg_sec > 0:
        print(f"Estimate: {3600/avg_sec:.1f} days/hour, {86400/avg_sec:.1f} days/day")

if __name__ == '__main__':
    # CLI: allow running with --simulate and optional start/end dates
    parser = argparse.ArgumentParser()
    parser.add_argument('--simulate', action='store_true', help='Use simulated data')
    parser.add_argument('--start', type=str, help='Start date YYYY-MM-DD')
    parser.add_argument('--end', type=str, help='End date YYYY-MM-DD')
    args = parser.parse_args()

    try:
        training_config = load_training_config()
    except Exception as e:
        print(f"Configuration error: {e}")
        sys.exit(1)

    if args.simulate:
        training_config['simulate'] = True
        print('SIMULATE mode ON')
    if args.start:
        training_config['start_date'] = args.start
    if args.end:
        training_config['end_date'] = args.end

    get_training_data(training_config)