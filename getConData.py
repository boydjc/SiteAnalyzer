from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    potentIPs = request.headers.getlist("X-Forwarded-For")[0]

    potentIPList = potentIPs.split(',')

    visitorIP = potentIPList[len(potentIPList)-1]

    return "Visitor IP: " + visitorIP;

if __name__ == "__main__":
    app.run();
