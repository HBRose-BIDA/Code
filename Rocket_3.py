import matplotlib.pyplot as plt
import numpy as np

# Data
x = [15.5, 23.75, 8, 17, 5.5, 19, 24, 2.5, 7.5, 11, 13, 3.75, 25, 9.75, 22, 18, 6, 12.5, 2, 21.5]
y = [2158.7, 1678.15, 2316, 2061.3, 2207.5, 1708.3, 1784.7, 2575, 2357.9, 2256.7, 2165.2, 2399.55, 1779.8, 2336.75, 1765.3, 2053.5, 2414.4, 2200.5, 2654.2, 1753.7]

# Create a scatter plot
plt.scatter(x, y, marker='o', color='b', label='Data Points')

# Fit a linear regression model
coefficients = np.polyfit(x, y, 1)

# Extract slope and y-intercept
slope, intercept = coefficients

# Print the estimated parameters
print(f"Slope (m): {slope}")
print(f"Intercept (b): {intercept}")

# Plot the regression line
regression_line = np.polyval(coefficients, x)
plt.plot(x, regression_line, color='r', label='Linear Regression')

# Add labels and title
plt.xlabel('Age of Propellant (weeks)')
plt.ylabel('Shear Strength (psi)')
plt.title('Scatter Plot with Linear Regression')

# Show the plot with legend
plt.legend()
plt.grid(True)
plt.show()
