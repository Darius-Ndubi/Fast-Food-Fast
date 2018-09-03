from app import api

orders=[{'order_id':1,'item_id':1,'food_item':'Burger','price':450,'quantity':2,'total':900,'requester':'Squidward'},
{'order_id':2,'item_id':3,'food_item':'Pizza','price':600,'quantity':3,'total':1800,'requester':'Patrick'}]


"""
    A class to handle Orders
"""
class ManageOrdersDAO(object):
    """ 
        Method to find all orders
        Steps:
            -> check if there are any posted orders
            -> If orders have been posted it returns the orders
    """
    
    def find_all_orders (self):
        #check if there is any item in orders
        if len(orders)==0:
            api.abort(404, "No orders yet")
        
        return orders      