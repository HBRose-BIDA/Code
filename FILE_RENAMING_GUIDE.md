# Optional File Renaming Guide
## Making Your Portfolio Even More Scannable

Below are suggested file renames that make the purpose immediately clear when someone views your GitHub repository file list. These are **optional** - your current names work fine with the catalog documents.

---

## SUGGESTED RENAMES (Current → Suggested)

### Machine Learning Projects
- `K-Mean Clustering.py` → `customer_segmentation_kmeans.py`
- `Linear regression.py` → `revenue_prediction_linear_regression.py`
- `sklearncode.py` → `model_evaluation_auc.py`
- `WithPLR.py` → `polynomial_logistic_regression.py`

### Statistical Analysis
- `ID outliers.py` → `outlier_detection_zscore_iqr.py`
- `Outlier2.py` → `outlier_detection_v2.py`
- `Change the correlation.py` → `correlation_analysis_all_variables.py`
- `Mode.py` → `mode_calculation_statistics.py`
- `Chart values.py` → `ecommerce_correlation_visualization.py`

### Data Integration & APIs
- `NHL API teams.py` → `api_integration_nhl_teams.py`
- `Dump JSON.py` → `api_data_extraction_json.py`
- `Pull the Game details working xy.py` → `api_game_coordinates_extraction.py`
- `RdJSON.py` → `json_file_reader.py`
- `Reading Access.py` → `database_access_connection.py`
- `read sasfile.py` → `sas_data_integration.py`

### Web Scraping
- `Scrape.ipynb` → `web_scraping_date_range_automation.ipynb`
- `scrapebetwndates.py` → `web_scraping_between_dates.py`

### Data Analysis Fundamentals
- `Unique User ID.py` → `user_count_distinct_analysis.py`
- `PandasSeriesDataFrames_v3.ipynb` → `pandas_fundamentals_lab.ipynb`
- `PandasProblems_v2.ipynb` → `pandas_practice_problems.ipynb`
- `GroupByPivotPlotMerge.ipynb` → `data_aggregation_visualization.ipynb`
- `Attendance.ipynb` → `attendance_tracking_analysis.ipynb`

### Time Series & Forecasting
- `NumpyExtraCredit03082020 - w_roll.ipynb` → `time_series_forecasting_custom.ipynb`

### Academic Work
- `FinalExamVersion1 - answers-checkpoint.ipynb` → `data_mining_final_exam.ipynb`

### Configuration
- `import saspy os.py` → `sas_python_bridge_setup.py`
- `sascfg_personal.py` → `sas_configuration.py`

### Miscellaneous
- `Simple_2A.py` → `analysis_template_simplified.py`
- `Rocket_3.py` → `advanced_data_processing_v3.py`
- `# write a function that takes in a 1-d N.py` → `numpy_1d_function.py`

---

## FILE NAMING BEST PRACTICES (If Renaming)

### Structure: `category_description_technique.extension`

**Examples:**
- `customer_segmentation_kmeans.py` (category: customer, what: segmentation, how: kmeans)
- `revenue_prediction_linear_regression.py` (what: revenue prediction, how: linear regression)
- `api_integration_nhl_teams.py` (category: api, what: integration, source: nhl teams)

### General Rules:
1. **Use underscores** instead of spaces (industry standard for Python)
2. **All lowercase** for consistency
3. **Start with category** or business function when possible
4. **Include technique** if it's a key skill demonstration (kmeans, regression, etc.)
5. **Avoid generic names** like "code.py" or "test.py"
6. **Version numbers at end** if keeping multiple versions (v2, v3)

---

## HOW TO RENAME (If You Choose To)

**Option 1: Using File Explorer (Windows)**
1. Navigate to folder
2. Right-click file → Rename
3. Type new name

**Option 2: Using Git Commands (Preserves History)**
```bash
git mv "old filename.py" "new_filename.py"
git commit -m "Rename files for clarity"
```

**Option 3: In VS Code**
- Right-click file → Rename
- Type new name
- Git will track the rename automatically

---

## ⚠️ IMPORTANT NOTES

- **Backup first** if renaming many files
- **Update any imports** if files reference each other
- **Git will preserve history** if using `git mv` command
- Your **PORTFOLIO_CATALOG.csv already labels everything** so renaming is truly optional
- Many hiring managers won't care about filenames if the catalog is clear

---

## RECOMMENDATION

**For Business Hiring Managers:** The catalog documents are sufficient - they can scan without opening files.

**For Technical Hiring Managers:** Renaming helps when they browse your GitHub repository, but the code quality matters more than filenames.

**Best of Both Worlds:** Keep the catalog documents as your primary "scannable list" and optionally rename the most important 5-10 files you want to highlight.