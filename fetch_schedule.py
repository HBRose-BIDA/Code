import requests
import json

REQUIRED_SCHEDULE_KEYS = ['target_date', 'schedule_dsn']


def load_schedule_config(config_file='config.json'):
    with open(config_file, 'r') as f:
        config = json.load(f)

    schedule = config.get('schedule')
    if not isinstance(schedule, dict):
        raise ValueError("Missing required 'schedule' section in config.json")

    missing = [k for k in REQUIRED_SCHEDULE_KEYS if k not in schedule]
    if missing:
        raise ValueError(f"Missing required schedule config keys: {', '.join(missing)}")

    return schedule

def pull_nhl_schedule(schedule_config):
    target_date = schedule_config['target_date']
    output_dsn = schedule_config['schedule_dsn']

    print(f"Reading config... Target Date: {target_date}")
    
    url = f"https://api-web.nhle.com/v1/schedule/{target_date}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        games_list = []
        
        # 2. FILTER FOR THE DATE IN CONFIG
        for day in data.get('gameWeek', []):
            if day['date'] == target_date:
                for game in day.get('games', []):
                    games_list.append({
                        "game_id": game['id'],
                        "home": game['homeTeam']['abbrev'],
                        "away": game['awayTeam']['abbrev']
                    })
        
        # 3. SAVE TO THE DSN SPECIFIED IN CONFIG
        if games_list:
            with open(output_dsn, 'w') as f:
                json.dump(games_list, f, indent=4)
            print(f"SUCCESS: {len(games_list)} games saved to {output_dsn}")
        else:
            print(f"No games found for {target_date}.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    try:
        schedule_config = load_schedule_config()
    except Exception as e:
        print(f"Configuration error: {e}")
        raise SystemExit(1)

    pull_nhl_schedule(schedule_config)