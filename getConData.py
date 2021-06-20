from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    visitorIP = request.headers.getlist("X-Forwarded-For")[0]

    headers = request.headers

    #return "Visitor IP: " + visitorIP;
    return str(headers)

if __name__ == "__main__":
    app.run();
