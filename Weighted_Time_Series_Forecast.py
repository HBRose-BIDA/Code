# write a function that takes in a 1-d Numpy array of actual initial values, a numeric weight scaler (between 0.9 and 0.99) and the number of previous time steps for prediction k, and return a numpy array of forecasted values for all values in that array starting with the k+1st one(we need to use the first k actual values to forecast the first observation). The idea here is that the most recent observation takes on a higher weight than less-recent observations in the data. Please use Numpy vectorization methods to solve the problem.import numpy as np
import numpy as np
def forecast_values(actual_values, weight_scaler, k):
    forecasted_values = np.zeros_like(actual_values)
    forecasted_values[:k] = actual_values[:k]
    for i in range(k, len(actual_values)):
        forecasted_values[i] = weight_scaler * actual_values[i-1] + (1-weight_scaler) * forecasted_values[i-1]
    return forecasted_values[k:]

# Example usage:
actual_values = np.array([216, 201, 179, 139, 154, 158, 132, 117, 132,  97])
weight_scaler = 0.99
k = 3
forecasted_values = forecast_values(actual_values, weight_scaler, k)
print(forecasted_values)

