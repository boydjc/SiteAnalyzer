from flask import Flask, request, render_template, flash, redirect
from loginForm import LoginForm
import os
from dbMan import DBMan

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
dbMan = DBMan()

@app.route('/', methods=['GET','POST'])
def index():

    user = {'username': 'Joshua'}

    form = LoginForm()

    if(request.method == 'POST'):

        if(form.validate_on_submit()):
            flash('Login Requested for user {}, rememberMe={}'.format(
                form.username.data, form.rememberMe.data))
            return redirect('/success')

        #potentIPs = request.headers.getlist("X-Forwarded-For")[0]

        #potentIPList = potentIPs.split(',')

        #visitorIP = potentIPList[len(potentIPList)-1]

        #dbMan.logIP(visitorIP)

        #return "Visitor IP stored"

    elif(request.method == 'GET'):
        
        pass
    
    return render_template('index.html', user=user, form=form)


@app.route('/success', methods=['Get'])
def success():

    return render_template('loginSuccess.html')

if __name__ == "__main__":
    app.run();
