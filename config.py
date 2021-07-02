import os

class Config(object):
    SECRET_KEY = os.environ['SECRET_KEY'] or 'debug-key'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL'].replace("://", "ql://", 1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
