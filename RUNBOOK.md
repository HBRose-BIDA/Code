# NHL ETL + Prediction Runbook

## Purpose and Outcome

### Goal

Produce reliable, repeatable NHL game winner predictions for a target date using historical team performance snapshots, with outputs that can be scheduled and audited.

### What the Flow Does

1. Builds historical training records in `fetch_training_data.py` and writes `master_training_data.json`.
2. Trains an XGBoost model in `train_model.py` and writes `nhl_win_predictor.json`.
3. Pulls scheduled games for a target date in `fetch_schedule.py` and writes `today_games.json`.
4. Scores scheduled games in `generate_predictions.py` and appends results to `model_predictions_log.csv`.

### How the Flow Meets the Goal

- Separation of schedules: training and prediction batches can run independently.
- Deterministic execution: dates and paths are set explicitly in `config.json`.
- Operational safety: scripts validate required config sections and fail fast on missing keys.
- Traceability: predictions are append-logged for historical run auditing.
- Testability: simulation mode supports non-API dry runs for pipeline verification.

## 1. Scope

This runbook covers day-to-day operation of the NHL training and prediction pipeline in this folder.

## 2. Pipeline Jobs and Outputs

| Step | Script | Primary Input | Primary Output |
|---|---|---|---|
| 1 | `fetch_training_data.py` | `config.json` (`training.*`) + NHL API | `master_training_data.json` |
| 2 | `train_model.py` | `master_training_data.json` | `nhl_win_predictor.json` |
| 3 | `fetch_schedule.py` | `config.json` (`schedule.*`) + NHL API | `today_games.json` |
| 4 | `generate_predictions.py` | `config.json` (`schedule.*`, `prediction.*`), `master_training_data.json`, `nhl_win_predictor.json`, `today_games.json` | `model_predictions_log.csv` |

Notes:
- Steps 1-2 are the training batch.
- Steps 3-4 are the prediction batch.
- Batches can run on separate schedules.

## 3. Prerequisites

- Python virtual environment active: `.venv`
- Packages used by scripts:
  - `requests`
  - `pandas`
  - `xgboost`
  - `scikit-learn`

## 4. Standard Run Procedure

From this folder:

```powershell
.\.venv\Scripts\Activate.ps1
python fetch_training_data.py
python train_model.py
python fetch_schedule.py
python generate_predictions.py
```

If you only need fresh predictions (no retraining), run:

```powershell
.\.venv\Scripts\Activate.ps1
python fetch_schedule.py
python generate_predictions.py
```

## 5. Scheduling Model

Recommended cadence:
- Training batch (steps 1-2): daily or weekly.
- Prediction batch (steps 3-4): daily before first puck drop.

Operational dependency:
- Prediction batch requires `nhl_win_predictor.json` to exist from at least one training run.

## 6. Config Change Guide

File: `config.json`

Safe to change frequently:
- `schedule.target_date`
- `training.start_date`
- `training.end_date`
- `training.simulate`

Change rarely:
- `training.base_url`
- `training.output_dsn`
- `prediction.training_dsn`
- `prediction.model_dsn`
- `prediction.predictions_log`

Validation behavior:
- `fetch_training_data.py` fails fast if required `training.*` keys are missing.
- `fetch_schedule.py` fails fast if required `schedule.*` keys are missing.
- `generate_predictions.py` fails fast if required `schedule.*` or `prediction.*` keys are missing.

## 7. Data Contracts

### 7.1 `master_training_data.json`

Array of game records. Required top-level fields per record:
- `game_id` (int/string)
- `date` (YYYY-MM-DD)
- `home_team` (abbr)
- `away_team` (abbr)
- `home_features` (object)
- `away_features` (object)
- `winner` (abbr)

`home_features` and `away_features` are standings snapshots from the prior day and may contain nested values (for example `placeName.default`).

### 7.2 `today_games.json`

Array of scheduled games for one date. Required fields:
- `game_id`
- `home`
- `away`

### 7.3 `model_predictions_log.csv`

Append-only CSV. Columns:
- `pred_timestamp`
- `game_date`
- `matchup` (format `AWY@HOME`)
- `prediction`
- `confidence`

## 8. Model Behavior (Current)

Script: `train_model.py`

- Builds target as:
  - `1` if `winner == home_team`
  - `0` otherwise
- Flattens nested feature objects with `home_` / `away_` prefixes.
- Drops columns containing `Logo` or `date`.
- Encodes object columns with per-column label encoding.
- Trains `XGBClassifier(n_estimators=100, max_depth=5)`.
- Saves model to `nhl_win_predictor.json`.

Important implementation note:
- `train_model.py` currently uses fixed filenames (`master_training_data.json`, `nhl_win_predictor.json`) and does not yet read `config.json`.

## 9. Prediction Behavior (Current)

Script: `generate_predictions.py`

- Loads model and expected feature list from `nhl_win_predictor.json`.
- For each scheduled game, finds each team's latest stats in historical data.
- Flattens features, aligns columns to model feature names, and fills missing features with `0`.
- Predicts winner and confidence from model probabilities.
- Appends output rows to `model_predictions_log.csv`.

## 10. Troubleshooting

### Config errors

Symptom:
- `Configuration error: Missing required ...`

Action:
- Verify required sections/keys in `config.json`.

### Model file missing

Symptom:
- XGBoost load error when running predictions.

Action:
- Run training batch first:
  - `python fetch_training_data.py`
  - `python train_model.py`

### Empty or no games on target date

Symptom:
- `No games found for <date>.`

Action:
- Verify `schedule.target_date` and rerun `fetch_schedule.py`.

### No stats found in history for scheduled teams

Symptom:
- `No stats found in history for these teams.`

Action:
- Regenerate training data with a date range that includes recent snapshots for scheduled teams.

### API/network problems

Symptom:
- `An error occurred: ...` or per-day fetch errors.

Action:
- Retry job.
- Confirm internet access and endpoint availability.
- For test runs, set `training.simulate` to `true`.

### `requests` import unavailable

Symptom:
- Errors when calling API endpoints with `training.simulate=false`.

Action:
- Install dependency in active env: `pip install requests`.

## 11. Output Interpretation

- `prediction` is the model-selected winner for each matchup.
- `confidence` is the model's max class probability for that game.
- Confidence is not guaranteed real-world win probability calibration.
- Repeated runs for same date append additional rows; this is expected because log mode is append.
