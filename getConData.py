from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    visitorIP = request.headers.getlist("X-Forwarded-For")[len(request.headers.getlist("X-Forwarded-For")-1)]

    headers = request.headers

    return "Visitor IP: " + visitorIP;

if __name__ == "__main__":
    app.run();
