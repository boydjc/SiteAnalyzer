from flask import Flask, request, render_template, flash, redirect
from forms import LoginForm, RegisterForm
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from datetime import date

app = Flask(__name__)
#app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SECRET_KEY'] = 'debug-key'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL'].replace("://", "ql://", 1)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

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

    form = LoginForm() 

    if(request.method == 'POST'):
        # checks to see if the fields in the form 
        # have values, if so then we successfully login
        # if not then we return the form to the user again
        if(form.validate_on_submit()):
            # TODO: validate user login
            flash('Login Requested for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect('/success')

    # if GET request just render the login form
    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():

    form = RegisterForm()

    if(request.method == 'POST'):
        if(form.validate_on_submit()):
            #create the user account
            user = models.User(username = form.username.data,
                    email = form.email.data)
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()


@app.route('/success', methods=['Get'])
def success():

    return render_template('loginSuccess.html')


#circular import
import models

if __name__ == "__main__":
    app.run();
