import pandas as pd
from scipy import stats

# File path for input and output
input_file_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Week 1\Training_Data_Regression.xlsx"
output_file_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Week 1\Outliers.xlsx"

# Load the data with headers from the first row
data = pd.read_excel(input_file_path)

# Function to detect outliers
def detect_outliers(df, column):
    # Z-Score method
    df['Z_Score'] = stats.zscore(df[column].dropna())
    outliers_z = df[(df['Z_Score'] > 3) | (df['Z_Score'] < -3)]

    # Interquartile Range (IQR) method
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    outliers_iqr = df[(df[column] < (Q1 - 1.5 * IQR)) | (df[column] > (Q3 + 1.5 * IQR))]

    return outliers_z, outliers_iqr

# Create a Pandas Excel writer using XlsxWriter as the engine
writer = pd.ExcelWriter(output_file_path, engine='xlsxwriter')

# Iterate through each column
for column in data.columns:
    # Check if the column is numeric
    if pd.api.types.is_numeric_dtype(data[column]):
        outliers_z, outliers_iqr = detect_outliers(data, column)

        # Write each method's outliers to a different sheet, truncating sheet names to 30 characters
        z_score_sheet_name = f'{column}_Z-Score'[:30]
        iqr_sheet_name = f'{column}_IQR'[:30]

        outliers_z.to_excel(writer, sheet_name=z_score_sheet_name, index=False)
        outliers_iqr.to_excel(writer, sheet_name=iqr_sheet_name, index=False)

# Save the file
writer.save()
