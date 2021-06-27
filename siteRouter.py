from flask import Flask, request, render_template, flash, redirect
from loginForm import LoginForm
import os
from dbMan import DBMan

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
dbMan = DBMan()

@app.route('/', methods=['GET','POST'])
def index():

    form = LoginForm()

    if(request.method == 'POST'):

        potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        potentIPList = potentIPs.split(',')

        visitorIP = potentIPList[len(potentIPList)-1]

        dbMan.logIP(visitorIP)

        return "Visitor IP stored"

    # if GET request just render the login form    
    return render_template('index.html', user=user, form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    if(request.method == 'POST'):
        # checks to see if the fields in the form 
        # have values, if so then we successfully login
        # if not then we return the form to the user again
        if(form.validate_on_submit()):
            flash('Login Requested for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect('/success')

    # if GET request just render the login form
    return render_template('index.html', form=form)


@app.route('/success', methods=['Get'])
def success():

    return render_template('loginSuccess.html')

if __name__ == "__main__":
    app.run();
