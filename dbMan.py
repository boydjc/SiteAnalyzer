import os
import psycopg2
from datetime import date

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



