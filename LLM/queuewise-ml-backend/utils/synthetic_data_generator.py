import pandas as pd
import numpy as np

def generate_data():
    data = pd.DataFrame({
        'timestamp': pd.date_range('2025-04-26 08:00', periods=100, freq='5min'),
        'queue_length': np.random.randint(5, 50, 100),
        'service_time': np.random.uniform(2, 10, 100),
        'wait_time': np.random.uniform(5, 30, 100)
    })
    data.to_csv('data/queue_data.csv', index=False)
    print("Synthetic queue data created at data/queue_data.csv")

if __name__ == "__main__":
    generate_data()
