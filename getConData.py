from flask import Flask, request
from datetime import date
import sqlite3

app = Flask(__name__)
con = sqlite3.connect('conData.db')
cur = con.cursor()

@app.route('/', methods=['GET'])
def index():

    cur.execute('''CREATE TABLE connections (date text, ip text)''')

    potentIPs = request.headers.getlist("X-Forwarded-For")[0]

    potentIPList = potentIPs.split(',')

    visitorIP = potentIPList[len(potentIPList)-1]

    cur.execute('INSERT INTO connections ("' + str(date.today()) + '", "' + visitorIP + '")')

    return "Visitor IP stored"

if __name__ == "__main__":
    app.run();
