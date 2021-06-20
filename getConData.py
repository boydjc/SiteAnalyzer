from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    visitorIP = flask.request.remote_addr
    return "Visitor IP: " + visitorIP;

if __name__ == "__main__":
    app.run():
