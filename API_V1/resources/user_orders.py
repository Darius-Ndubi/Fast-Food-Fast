from flask import Flask
from flask_restplus import Api, Resource, fields
from werkzeug.contrib.fixers import ProxyFix
from app import api
from app.models.manOrders import ManageOrdersDAO

ns = api.namespace('api/v1/orders', description='Actions that can be done to orders')


"""
    create an instance of class manageOrdersDAO
"""
orderAO=ManageOrdersDAO()

"""
    User orders endpoint
"""
@ns.route('')
@ns.response(200, 'This are the orders')
@ns.response(404, 'No Orders yet')
class Order(Resource):
    @ns.doc('List orders to made')
    def get(self):
        '''Geting all posted orders'''
        return orderAO.find_all_orders (),200



