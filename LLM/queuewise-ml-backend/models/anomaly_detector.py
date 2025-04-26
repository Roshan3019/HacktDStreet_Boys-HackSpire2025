import random

class AnomalyDetector:
    def predict(self, features):
        # Randomly flag ~10% as anomaly
        return [-1 if random.random() < 0.1 else 1]
