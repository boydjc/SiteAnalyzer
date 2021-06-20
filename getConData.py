from flask import Flask, request
from datetime import date
import pandas as pd
import os
import psycopg2

app = Flask(__name__)
databaseUrl = os.environ['DATABASE_URL']

@app.route('/', methods=['GET','POST'])
def index():

    conn = psycopg2.connect(databaseUrl, sslmode='require')

    cur = conn.cursor()

    if(request.method == 'POST'):

        cur.execute('CREATE TABLE connections (date text, ip text)')

        print("Table created")

        potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        potentIPList = potentIPs.split(',')

        visitorIP = potentIPList[len(potentIPList)-1]

        cur.execute('INSERT INTO connections (date, ip) VALUES (%s, %s)', (date.today(), visitorIP))

        conn.commit()

        conn.close()

        return "Visitor IP stored"

    elif(request.method == 'GET'):
            
        cur.execute("SELECT * FROM connections")

        connData = cur.fetchall()

        cur.close()
        conn.close()

        return connData


if __name__ == "__main__":
    app.run();
