import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler

# Load data
file_path = "C:/Users/roser/OneDrive/HB/St Marys/Classes/BIA 650 Data Mining for Decision Making/Week 6/Data/BIA650 Wine Data.xlsx"
df = pd.read_excel(file_path)

# Assuming "Offer Bought" is a feature to cluster on, you might need to prepare it depending on its type
# For this example, I'll assume it's already numerical or has been converted to numerical

# Scaling the data - important for K-Means if the variables are on different scales
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[['Offer Bought']])  # Adjust this line to include the variables you're interested in

# Apply K-Means with a range of cluster counts
inertia = []
range_clusters = range(1, 6)  # Up to 5 clusters

for n_clusters in range_clusters:
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans.fit(df_scaled)
    inertia.append(kmeans.inertia_)

# Plot the elbow graph to find the optimal number of clusters
plt.figure(figsize=(10, 6))
plt.plot(range_clusters, inertia, marker='o')
plt.title('Elbow Method For Optimal Number of Clusters')
plt.xlabel('Number of clusters')
plt.ylabel('Inertia')
plt.xticks(range_clusters)
plt.show()
