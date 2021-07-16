from flask import Flask, request, render_template, flash, redirect
from werkzeug.urls import url_parse
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Account, Connection
import os
from datetime import date
from app import app, db
import requests
import json

@app.route('/', methods=['GET','POST'])
def index():

    # if a regular post is made to the index page then just log the ip of the
    # request
    if(request.method == 'POST'):

        potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        potentIPList = potentIPs.split(',')

        visitorIP = potentIPList[len(potentIPList)-1]

        # get the other information for the ip
        res = requests.get('http://demo.ip-api.com/json/' + visitorIP + 
                '?fields=66842623&lang=en').json() 

        visitorCon = Connection(ipAddress=visitorIP, 
                dateVisited=date.today(),
                country=res['country'],
                state=res['regionName'],
                city=res['city'],
                lat=res['lat'],
                lon=res['lon'],
                isp=res['isp'],
                mobile=res['mobile'],
                proxy=res['proxy'])

        db.session.add(visitorCon)
        db.session.commit()

        return ""
    
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():

    if(current_user.is_authenticated):
        return redirect('/home')

    form = LoginForm() 

    if(request.method == 'POST'):
        # checks to see if the fields in the form 
        # have values, if so then we successfully login
        # if not then we return the form to the user again
        if(form.validate_on_submit()):
            user = Account.query.filter_by(username=form.username.data).first()
            if(user is None or not user.get_password(form.password.data)):
                flash('Invalid username or password')
                return redirect('/login')
            login_user(user, remember=form.rememberMe.data)
            # redirects to the page the user was trying to get to
            # if they have to log in before they view it
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = '/home'
            flash('Login Successful for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect(next_page)

    # if GET request just render the login form
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')

@app.route('/home', methods=['GET'])
@login_required
def home():
    return render_template('home.html')

@app.route('/data', methods=['GET'])
@login_required
def data():
    # this url will be used to get data from the database
    # through a GET request

    allConns = Connection.query.all()

    allConnsDict = {}

    for connection in allConns:
        connDict = {
            "id" : connection.id,
            "dateVisited" : connection.dateVisited.__str__(),
            "ipAddress" : connection.ipAddress,
            "country" : connection.country,
            "state" : connection.state,
            "city" : connection.city,
            "lat" : str(connection.lat),
            "lon" : str(connection.lon),
            "isp" : connection.isp,
            "mobile" : connection.mobile,
            "proxy" : connection.proxy
        }

        allConnsDict["Connection " + str(connection.id)] = connDict

    allConnsJSON = json.dumps(allConnsDict) 

    return allConnsJSON
