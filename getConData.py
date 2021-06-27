from flask import Flask, request, render_template, flash, redirect
from loginForm import LoginForm
from datetime import date
import pandas as pd
import os
import psycopg2
from dbMan import DBMAN

app = Flask(__name__)
databaseUrl = os.environ['DATABASE_URL']
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

@app.route('/', methods=['GET','POST'])
def index():

    user = {'username': 'Joshua'}

    form = LoginForm()

    dbMan = DBMAN()

    #conn = psycopg2.connect(databaseUrl, sslmode='require')

    #cur = conn.cursor()

    if(request.method == 'POST'):

        if(form.validate_on_submit()):
            flash('Login Requested for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect('/success')


        #cur.execute('CREATE TABLE IF NOT EXISTS connections (date text, ip text)')

        #print("Table created")

        #potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        #potentIPList = potentIPs.split(',')

        #visitorIP = potentIPList[len(potentIPList)-1]

        #cur.execute('INSERT INTO connections (date, ip) VALUES (%s, %s)', (date.today(), visitorIP))

        #conn.commit()

        #conn.close()

        #return "Visitor IP stored"

    elif(request.method == 'GET'):
        
        # login page
        
        #cur.execute("SELECT * FROM connections")

        #connData = cur.fetchall()

        #cur.close()
        #conn.close()

        #return str(connData)

        pass
    
    return render_template('index.html', user=user, form=form)


@app.route('/success', methods=['Get'])
def success():

    return render_template('loginSuccess.html')

if __name__ == "__main__":
    app.run();
