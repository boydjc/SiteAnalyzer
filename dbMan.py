import os
import psycopg2
from datetime import date
import hashlib

class DBMan:

    def __init__(self):
        self.databaseUrl = os.environ['DATABASE_URL']
        self.conn = psycopg2.connect(self.databaseUrl, sslmode='require')
        self.cur = self.conn.cursor()

    def logIP(self, visitorIP):
        self.cur.execute('CREATE TABLE IF NOT EXISTS connections (date text, ip text)')
        self.cur.execute('INSERT INTO connectsion (date, ip) VALUES (%s, %s)', (date.today(), visitorIP))

        self.conn.commit()

    def retrieveIPs(self):
        self.cur.execute('SELECT * FROM connections')
        connData = self.cur.fetchall()

        return str(connData)

    def createUser(self, username, password):
        # hash the password
        passHash = hashlib.sha256(password.encode()).hexdigest()

        self.cur.execute('CREATE TABLE IF NOT EXISTS users (username text, password text)')

        self.cur.execute('SELECT * FROM users WHERE username = %s', (username,))

        userExists = self.cur.fetchone()

        if not(userExists):
            self.cur.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, passHash))
            print('User Created')

        self.conn.commit(

    def checkUserLogin(self, username, password):

        passHash = hashlib.sha256(password.encode()).hexdigest()

        self.cur.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, passHash))

        loginCorrect = self.cur.fetchone()

        if(loginCorrect):
            return True

