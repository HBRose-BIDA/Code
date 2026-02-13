import matplotlib.pyplot as plt
import numpy as np

x = [2, 3, 2, 0, 5, 1, 2, 0, 0, 2, 5, 0, 2, 3, 3, 2, 5, 5, 1, 2]
y = [28, 34, 32, 34, 38, 37, 30, 31, 32, 27, 29, 28, 31, 33, 29, 26, 28, 25, 30, 35]

# calculate the mean of x and y
mean_x = np.mean(x)
mean_y = np.mean(y)

# calculate the slope and intercept of the regression line
m = (np.sum((x - mean_x) * (y - mean_y))) / (np.sum((x - mean_x) ** 2))
b = mean_y - m * mean_x

# create the regression line
regression_line = [m * x_ + b for x_ in x]

# plot the scatter chart and regression line
plt.scatter(x, y)
plt.plot(x, regression_line, color='red')
plt.title('Scatter Chart with Regression Line')
plt.xlabel('Goals')
plt.ylabel('Shots')
plt.show()
