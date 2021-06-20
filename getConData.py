from flask import Flask, request
from datetime import date
import sqlite3

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():

    with sqlite3.connect("connData.db") as con:

        cur = con.cursor()

        cur.execute('''CREATE TABLE connections (date text, ip text)''')

        potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        potentIPList = potentIPs.split(',')

        visitorIP = potentIPList[len(potentIPList)-1]

        cur.execute('INSERT INTO connections VALUES ("' + str(date.today()) + '", "' + visitorIP + '")')

        con.commit()

        return "Visitor IP stored"

if __name__ == "__main__":
    app.run();
