import pandas as pd

def print_correlation(df, col1, col2):
    correlation = df[col1].corr(df[col2])
    print(f"Correlation between {col1} and {col2}: {correlation}")

# Define the file path and sheet name
file_path = r'C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Training_Data_Regression - Rev 1.xlsx'
sheet_name = 'Training Data'

# Read the Excel file into a DataFrame
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Iterate over all pairs of columns to calculate correlations
column_names = df.columns
for i in range(len(column_names)):
    for j in range(i+1, len(column_names)):
        print_correlation(df, column_names[i], column_names[j])

