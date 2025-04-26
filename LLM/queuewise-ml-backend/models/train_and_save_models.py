# train_and_save_models.py

import pandas as pd
import numpy as np
import joblib
from xgboost import XGBRegressor
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split

# Generate synthetic queue data
data = pd.DataFrame({
    'queue_length': np.random.randint(5, 50, 100),
    'service_time': np.random.uniform(2, 10, 100),
    'wait_time': np.random.uniform(5, 30, 100)
})

# X and y for Wait Time Prediction
X = data[['queue_length', 'service_time']]
y = data['wait_time']

# Train Wait Time Prediction Model (XGBoost)
model = XGBRegressor()
model.fit(X, y)

# Save Wait Time Prediction Model
joblib.dump(model, 'wait_time_model.pkl')

# Train Anomaly Detection Model (Isolation Forest)
iso_forest = IsolationForest(contamination=0.1)
iso_forest.fit(X)

# Save Anomaly Detection Model
joblib.dump(iso_forest, 'anomaly_model.pkl')

print("✅ Models trained and .pkl files created successfully!")
