from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load model with error handling
model_path = os.path.join(os.path.dirname(__file__), 'wait_time_model.pkl')
try:
    model = joblib.load(model_path)
except FileNotFoundError:
    print(f"Error: {model_path} not found. Please run train_model.py first.")
    exit(1)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    hour = data.get('hour', 12)
    day_of_week = data.get('day_of_week', 5)
    queue_length = data.get('queue_length', 20)

    features = pd.DataFrame([[hour, day_of_week, queue_length]], columns=['hour', 'day_of_week', 'queue_length'])
    wait_time = model.predict(features)[0]
    return jsonify({
        'wait_time': f"{wait_time:.0f} min",
        'recommended_slot': '11:00 AM' if wait_time > 30 else 'Now'
    })

if __name__ == '__main__':
    app.run(port=5002, debug=True)