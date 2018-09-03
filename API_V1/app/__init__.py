from flask import Flask
from flask_restplus import Api, Resource, fields
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

api = Api(app, version='1.0', title='Fast Food Fast API',
    description='Fast-Food-Fast is a food delivery service app for a restaurant',)

from resources.user_auth import ns as auth
api.add_namespace(auth)