from flask import Flask, request, jsonify
from flask_cors import CORS
from models.wait_time_predictor import WaitTimePredictor
from models.slot_recommender import SlotRecommender
from models.anomaly_detector import AnomalyDetector
import joblib
# Assuming WaitTimePredictor is the model to be saved
model = WaitTimePredictor()
joblib.dump(model, 'wait_time_model.pkl')

from sklearn.ensemble import IsolationForest

# Train Isolation Forest model
iso_forest = IsolationForest(random_state=42)
# Assuming some training data is available as `training_data`
# iso_forest.fit(training_data)

# Save the trained Isolation Forest model
joblib.dump(iso_forest, 'anomaly_model.pkl')
app = Flask(__name__)
CORS(app)

# Load lightweight models
wait_time_model = WaitTimePredictor()
slot_model = SlotRecommender()
anomaly_model = AnomalyDetector()

@app.route('/')
def home():
    return "QueueWise Pro Pretrained API running 🚀"

@app.route('/predictWaitTime', methods=['POST'])
def predict_wait_time():
    data = request.json
    pred = wait_time_model.predict([[data['queue_length'], data.get('service_time', 5)]])[0]
    return jsonify({'predicted_wait_time': round(pred, 2)})

@app.route('/recommendSlot', methods=['POST'])
def recommend_slot():
    data = request.json
    slot = slot_model.recommend(data['queue_length'], data.get('wait_time', 5))
    return jsonify({'recommended_slot': str(slot)})

@app.route('/anomaly', methods=['POST'])
def detect_anomaly():
    data = request.json
    result = anomaly_model.predict([[data['queue_length'], data.get('wait_time', 5)]])[0]
    return jsonify({'anomaly': (result == -1)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
