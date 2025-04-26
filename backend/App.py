from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression
import datetime

app = Flask(__name__)
CORS(app)

# Simulated data: [hour, people] -> wait_time (minutes)
X = np.array([[8, 10], [9, 15], [10, 20], [11, 25], [12, 30]])
y = np.array([5, 8, 12, 18, 25])
model = LinearRegression().fit(X, y)

@app.route('/api/wait-time', methods=['GET'])
def predict_wait_time():
    hour = datetime.datetime.now().hour
    people = np.random.randint(10, 30)  # Simulated queue size
    wait_time = model.predict([[hour, people]])[0]
    return jsonify({'waitTime': max(0, round(wait_time, 2))})

@app.route('/api/slots', methods=['GET'])
def get_slots():
    # Simplified slot logic: generate slots for next 3 hours
    now = datetime.datetime.now()
    slots = [
        (now + datetime.timedelta(minutes=30 * i)).strftime('%I:%M %p')
        for i in range(1, 4)
    ]
    return jsonify({'slots': slots})

if __name__ == '__main__':
    app.run(debug=True, port=5000)