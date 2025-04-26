from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = 'YOUR-SENDGRID-API-KEY'

def send_anomaly_alert(queue_length, wait_time):
    message = Mail(
        from_email='your-email@example.com',
        to_emails='admin@example.com',
        subject='[ALERT] QueueWise Pro - Anomaly Detected',
        plain_text_content=f'Queue Length: {queue_length}\nWait Time: {wait_time}'
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        print("Anomaly alert email sent!")
    except Exception as e:
        print(str(e))
