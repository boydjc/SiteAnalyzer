from flask import Flask, request, render_template, flash, redirect
from app.forms import LoginForm, RegisterForm, LogoutForm
from flask_login import current_user, login_user, logout_user
from app.models import Account
import os
from datetime import date
from app import app

@app.route('/', methods=['GET','POST'])
def index():

    # if a regular post is made to the index page then just log the ip of the
    # request
    if(request.method == 'POST'):

        potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        potentIPList = potentIPs.split(',')

        visitorIP = potentIPList[len(potentIPList)-1]

        visitorCon = models.Connection(ipAddress=visitorIP, dateVisited=date.today())
        db.session.add(visitorCon)
        db.session.commit()

        return ""
    
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():

    if(current_user.is_authenticated):
        return redirect(url_for('/loginSuccess'))

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
            flash('Login Successful for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect('/loginSuccess')

    # if GET request just render the login form
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')

@app.route('/loginSuccess', methods=['Get'])
def loginSuccess():
    form = LogoutForm()
    return render_template('loginSuccess.html', form=form)

