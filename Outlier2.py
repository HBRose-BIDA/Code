import pandas as pd

# Function to identify and categorize outliers in a dataframe column based on IQR
def identify_outliers(data, column_name):
    # Calculate the IQR for the column
    Q1 = data[column_name].quantile(0.25)
    Q3 = data[column_name].quantile(0.75)
    IQR = Q3 - Q1

    # Define the upper and lower bounds for outliers
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Identify and categorize outliers based on the upper and lower bounds
    data['Outlier_Type'] = pd.np.where(data[column_name] > upper_bound, 'Above Upper Bound',
                                       pd.np.where(data[column_name] < lower_bound, 'Below Lower Bound', 'No Outlier'))
    outliers = data[data['Outlier_Type'] != 'No Outlier']
    return outliers

# Define the input file path
input_file_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Week2\Trng Data Avg Individual.xlsx"

# Load the Excel file
data = pd.read_excel(input_file_path)

# Using the function to identify and categorize outliers in 'AvgOfPages Visited' column
outliers = identify_outliers(data, 'AvgOfPages Visited')

# Define the output file path
output_file_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Week 1\Outliers_AVG.xlsx"

# Write the categorized outliers to a new Excel file
outliers.to_excel(output_file_path, index=False)

# Check if there are any outliers and print a message
if not outliers.empty:
    print(f"Categorized outliers found and written to {output_file_path}")
else:
    print("No outliers found in 'AvgOfPages Visited' column.")
