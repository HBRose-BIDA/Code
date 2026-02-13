import pandas as pd

# File path
file_path = "C:\\Users\\roser\\OneDrive\\HB\\St Marys\\Classes\\BIA 650 Data Mining for Decision Making\\Data\\Training_Data_Regression - Rev 1.xlsx"

# Read the excel file
try:
    data = pd.read_excel(file_path)
    # Calculate and print the mode of the dataframe
    mode = data.mode().iloc[0]
    print(mode)
except Exception as e:
    print(f"Error: {e}")
