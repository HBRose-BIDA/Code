# Configuration Documentation

## config.json

This file centralizes configuration for all pipeline jobs.

Operational procedures, run commands, troubleshooting, and data contracts are documented in [RUNBOOK.md](RUNBOOK.md).

### Sections and Fields

| Section.Field | Value | Purpose | Used By |
|-------|-------|---------|---------|
| `training.start_date` | `"2025-10-20"` | Start date for extraction window | `fetch_training_data.py` |
| `training.end_date` | `"2026-04-01"` | End date for extraction window | `fetch_training_data.py` |
| `training.output_dsn` | `"master_training_data.json"` | Output file for extracted training records | `fetch_training_data.py` |
| `training.base_url` | `"https://api-web.nhle.com/v1"` | NHL API base URL | `fetch_training_data.py` |
| `training.simulate` | `false` | Use simulated extraction mode | `fetch_training_data.py` |
| `training.simulate_latency` | `0.2` | Delay per simulated API call | `fetch_training_data.py` |
| `training.simulated_games_per_day` | `8` | Number of simulated games per day | `fetch_training_data.py` |
| `schedule.target_date` | `"2026-04-02"` | Date for pulling games/predictions | `fetch_schedule.py`, `generate_predictions.py` |
| `schedule.schedule_dsn` | `"today_games.json"` | Output/input file for today's games | `fetch_schedule.py`, `generate_predictions.py` |
| `prediction.training_dsn` | `"master_training_data.json"` | Historical training data input | `generate_predictions.py` |
| `prediction.model_dsn` | `"nhl_win_predictor.json"` | Trained model file path | `generate_predictions.py` |
| `prediction.predictions_log` | `"model_predictions_log.csv"` | CSV log for predictions | `generate_predictions.py` |

### Notes

- All scripts now read sectioned config keys; top-level legacy keys were removed.
- Dates are not computed in code. Update `training.start_date`, `training.end_date`, and `schedule.target_date` directly in `config.json`.
- `fetch_training_data.py` fails fast if required `training.*` keys are missing.

## Pipeline Flow

### Batch 1: Model Training (Independent Schedule)

1. `fetch_training_data.py`
- Reads `training.*` from `config.json`
- Pulls (or simulates) historical day-by-day game + standings snapshots
- Writes `master_training_data.json`

2. `train_model.py`
- Reads `master_training_data.json`
- Trains the XGBoost model
- Writes `nhl_win_predictor.json`

### Batch 2: Daily Predictions (Independent Schedule)

3. `fetch_schedule.py`
- Reads `schedule.*` from `config.json`
- Pulls scheduled games for `schedule.target_date`
- Writes `today_games.json`

4. `generate_predictions.py`
- Reads `schedule.*` and `prediction.*` from `config.json`
- Loads `nhl_win_predictor.json` and `today_games.json`
- Generates winners + confidence
- Appends results to `model_predictions_log.csv`

### Dependency Model

- Batch 1 and Batch 2 can run on separate schedules.
- Batch 2 requires a model file produced by Batch 1 at least once.
- On each prediction run, Batch 2 uses the latest available model.

### Run Order Summary

1. `fetch_training_data.py`
2. `train_model.py`
3. `fetch_schedule.py`
4. `generate_predictions.py`
