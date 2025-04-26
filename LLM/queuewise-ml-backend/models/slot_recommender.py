import pandas as pd
import random

class SlotRecommender:
    def __init__(self):
        self.data = pd.read_csv('data/queue_data.csv')

    def recommend(self, queue_length, wait_time):
        recommended_slots = self.data['timestamp'].tolist()
        return random.choice(recommended_slots)
