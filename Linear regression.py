import pandas as pd
from sklearn.linear_model import LinearRegression

# Load the data from your file
file_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\Week 1\dup.xlsx"  # Replace with the path to your Excel file
data = pd.read_excel(file_path)

# Assuming 'Avg Of YTD Online Rev' and 'Avg Of Distance From Closest Store' are the column names
X = data[['Avg Of YTD Online Rev']].values  # Predictor variable
y = data['Avg Of Distance From Closest Store'].values  # Response variable

# Create a linear regression model
model = LinearRegression()
model.fit(X, y)

# Retrieve the intercept and coefficient (slope)
intercept = model.intercept_
slope = model.coef_[0]

# Print the equation of the line
print(f"Linear Regression Equation: y = {slope:.4f} * x + {intercept:.4f}")
