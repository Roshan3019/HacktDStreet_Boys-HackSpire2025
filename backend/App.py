from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import joblib
import pandas as pd
from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import hf_hub_download
import os
import torch

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST"]}})

# Load the pre-built wait time prediction model
model_path = os.path.join(os.path.dirname(__file__), 'wait_time_model.pkl')
try:
    wait_time_model = joblib.load(model_path)
except FileNotFoundError:
    print(f"Error: {model_path} not found. Please ensure wait_time_model.pkl exists.")
    exit(1)

# Download and load the LLM model using huggingface_hub
try:
    model_id = "distilgpt2"
    tokenizer_path = hf_hub_download(repo_id=model_id, filename="tokenizer.json")
    model_path = hf_hub_download(repo_id=model_id, filename="pytorch_model.bin")
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id)
except Exception as e:
    print(f"Error loading LLM from Hugging Face: {e}")
    exit(1)

queue_data = [
    {'id': 1, 'name': 'Downtown Medical Center', 'queue': 12, 'waitTime': '15-20 min', 'status': 'Normal'},
    {'id': 2, 'name': 'Westside DMV Office', 'queue': 35, 'waitTime': '45-60 min', 'status': 'Busy'},
    {'id': 3, 'name': 'Eastside Tax Office', 'queue': 58, 'waitTime': '90-120 min', 'status': 'Very Busy'}
]

@app.route('/api/queue', methods=['GET'])
def get_queue():
    for center in queue_data:
        center['queue'] += random.randint(-5, 5)
        center['queue'] = max(0, center['queue'])
        center['waitTime'] = f"{center['queue'] * 1.5:.0f}-{center['queue'] * 2:.0f} min"
        center['status'] = 'Normal' if center['queue'] < 20 else 'Busy' if center['queue'] < 50 else 'Very Busy'
    print(f"GET /api/queue - Responding with {len(queue_data)} centers")
    return jsonify(queue_data)

@app.route('/api/booking', methods=['POST'])
def book_slot():
    print(f"POST /api/booking - Received data: {request.get_json()}")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    booking = {
        'reference': '#QW' + str(random.randint(10000, 99999)),
        'date': data.get('date', 'N/A'),
        'time': data.get('time', 'N/A'),
        'service': data.get('service', 'N/A'),
        'totalAmount': data.get('totalAmount', '$0.00')
    }
    # Mock notification
    notify_data = {
        'email': data['notificationPreferences']['email'],
        'sms': data['notificationPreferences']['sms'],
        'message': f'Booking confirmed! Reference: {booking["reference"]}, Time: {booking["date"]} at {booking["time"]}'
    }
    requests.post('http://localhost:5001/api/notify', json=notify_data)
    return jsonify({
        'message': 'Booking confirmed',
        'booking': booking
    }), 201

@app.route('/api/notify', methods=['POST'])
def notify_user():
    data = request.get_json()
    if data['email']:
        print(f"Mock email sent to user: {data['message']}")
    if data['sms']:
        print(f"Mock SMS sent to user: {data['message']}")
    return jsonify({'status': 'Notification sent'}), 200

@app.route('/api/recommend', methods=['POST'])
def recommend_slot():
    print(f"POST /api/recommend - Received data: {request.get_json()}")
    data = request.get_json()
    hour = data.get('hour', 12)
    day_of_week = data.get('day_of_week', 5)
    queue_length = data.get('queue_length', 20)

    # Predict wait time using the pre-built model
    features = pd.DataFrame([[hour, day_of_week, queue_length]], columns=['hour', 'day_of_week', 'queue_length'])
    wait_time = wait_time_model.predict(features)[0]
    recommended_slot = '11:00 AM' if wait_time > 30 else 'Now'
    anomaly_detected = wait_time > 120  # Threshold for unusual wait time

    # Generate a user-friendly message using the LLM
    prompt = f"The estimated wait time is {wait_time:.0f} minutes. Suggest a booking action."
    if anomaly_detected:
        prompt += " An unusually high wait time has been detected."
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=50, num_return_sequences=1, truncation=True)
    generated_message = tokenizer.decode(outputs[0], skip_special_tokens=True).replace(prompt, '').strip()

    response = {
        'wait_time': f"{wait_time:.0f} min",
        'recommended_slot': recommended_slot,
        'message': generated_message or "We recommend booking now for the best experience."
    }
    if anomaly_detected:
        response['warning'] = "Unusually high wait time detected, consider a different time."

    return jsonify(response)

@app.route('/')
def home():
    return "QueueWise Pro Backend is running!"

if __name__ == '__main__':
    app.run(port=5001, debug=True)