from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    visitorIP = request.environ['REMOTE_ADDR']
    return "Visitor IP: " + visitorIP;

if __name__ == "__main__":
    app.run();
