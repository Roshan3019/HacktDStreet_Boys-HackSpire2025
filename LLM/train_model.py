import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

data = {
    'hour': [9, 10, 11, 12, 13, 14, 15, 16, 17],
    'day_of_week': [5, 5, 5, 5, 5, 5, 5, 5, 5],
    'queue_length': [10, 15, 20, 25, 30, 35, 40, 45, 50],
    'wait_time': [15, 20, 25, 30, 35, 40, 45, 50, 55]
}
df = pd.DataFrame(data)

X = df[['hour', 'day_of_week', 'queue_length']]
y = df['wait_time']

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, 'wait_time_model.pkl')
print("Model trained and saved as wait_time_model.pkl")