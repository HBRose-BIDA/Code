import numpy as np
from sklearn.metrics import roc_auc_score

myarray = np.array([[0.3, 0], [0.3, 1], [0.7, 1], [0.9, 0]])
y_true = myarray[:, 1]
y_score = myarray[:, 0]

# Calculate AUC using scikit-learn
auc = roc_auc_score(y_true, y_score)

print(auc)
