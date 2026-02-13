import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Define the file path and sheet name
file_path = r'C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Training_Data_Regression - Rev 1.xlsx'
sheet_name = 'Training Data'

# Read the Excel file into a DataFrame
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Extract the relevant columns
time_on_site = df['Time On Site']
pages_visited = df['Pages Visited']
items_in_cart = df['Items In Cart']
value_of_basket = df['Value of Basket']

# Calculate correlations
correlation_time_items = time_on_site.corr(items_in_cart)
correlation_pages_items = pages_visited.corr(items_in_cart)
correlation_time_value = time_on_site.corr(value_of_basket)
correlation_pages_value = pages_visited.corr(value_of_basket)

# Create pairplots to visualize relationships
sns.pairplot(df[['Time On Site', 'Pages Visited', 'Items In Cart', 'Value of Basket']])
plt.show()

# Print correlation results
print("Correlation between Time On Site and Number of Items in Cart:", correlation_time_items)
print("Correlation between Pages Visited and Number of Items in Cart:", correlation_pages_items)
print("Correlation between Time On Site and Value of Basket:", correlation_time_value)
print("Correlation between Pages Visited and Value of Basket:", correlation_pages_value)
