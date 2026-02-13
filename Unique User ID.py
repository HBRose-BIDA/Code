import pandas as pd

# Specify the file path
file_path = r'C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Training_Data_Regression.xlsx'

# Read the Excel file into a DataFrame
df = pd.read_excel(file_path, sheet_name='Training Data')

# Count distinct values in column A
distinct_values_count = df['User ID'].nunique()

print(f'The number of distinct values in column A is: {distinct_values_count}')
