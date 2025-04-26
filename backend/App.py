from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression
import datetime

app = Flask(__name__)
CORS(app)
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to QueueWise Pro Backend"
app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Route for queue status
@app.route('/api/queue', methods=['GET'])
def get_queue():
    return jsonify([
        {'id': 1, 'name': 'Downtown Medical Center', 'queue': 12, 'waitTime': '15-20 min', 'status': 'Normal'},
        {'id': 2, 'name': 'Westside DMV Office', 'queue': 35, 'waitTime': '45-60 min', 'status': 'Busy'},
        {'id': 3, 'name': 'Eastside Tax Office', 'queue': 58, 'waitTime': '90-120 min', 'status': 'Very Busy'}
    ])

# Route for booking
@app.route('/api/booking', methods=['POST'])
def book_slot():
    data = request.get_json()
    service_center_id = data.get('serviceCenterId')
    date = data.get('date')
    time = data.get('time')
    return jsonify({'message': 'Booking confirmed', 'booking': {'serviceCenterId': service_center_id, 'date': date, 'time': time}})

# Optional: Root route for testing
@app.route('/')
def home():
    return "QueueWise Pro Backend is running!"

if __name__ == '__main__':
    app.run(port=5001, debug=True)
# Simulated data: [hour, people] -> wait_time (minutes)
# X = np.array([[8, 10], [9, 15], [10, 20], [11, 25], [12, 30]])
# y = np.array([5, 8, 12, 18, 25])
# model = LinearRegression().fit(X, y)

# @app.route('/api/wait-time', methods=['GET'])
# def predict_wait_time():
#     hour = datetime.datetime.now().hour
#     people = np.random.randint(10, 30)  # Simulated queue size
#     wait_time = model.predict([[hour, people]])[0]
#     return jsonify({'waitTime': max(0, round(wait_time, 2))})

# @app.route('/api/slots', methods=['GET'])
# def get_slots():
#     # Simplified slot logic: generate slots for next 3 hours
#     now = datetime.datetime.now()
#     slots = [
#         (now + datetime.timedelta(minutes=30 * i)).strftime('%I:%M %p')
#         for i in range(1, 4)
#     ]
#     return jsonify({'slots': slots})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)
