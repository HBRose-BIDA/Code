# First, install the necessary package if you haven't already:
# !pip install sas7bdat

from sas7bdat import SAS7BDAT

file_path = "C:\\Users\\roser\\OneDrive\\HB\\St Marys\\Classes\\BIA 650 Data Mining for Decision Making\\Data\\forwards.sas7bdat"

with SAS7BDAT(file_path) as file:
    df = file.to_data_frame()
print(df.head())
