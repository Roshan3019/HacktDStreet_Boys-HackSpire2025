import random

class WaitTimePredictor:
    def predict(self, features):
        queue_length, service_time = features[0]
        # Basic fake formula
        wait_time = (queue_length * service_time) / 10 + random.uniform(-2, 2)
        return [wait_time]
