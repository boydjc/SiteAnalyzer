from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db
from app import login

# assists Flask-Login with loading the account
@login.user_loader
def load_account(id):
    return Account.query.get(int(id))

class Account(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def get_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Connection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ipAddress = db.Column(db.String(20), index=True, unique=False)
    dateVisited = db.Column(db.Date(), index=True, unique=False)

