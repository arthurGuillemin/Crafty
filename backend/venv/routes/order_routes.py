from flask import Blueprint, jsonify , request
from services.supabase import get_orders_by_user_id , get_order_details_by_id
from services.supabase import create_order


order_routes = Blueprint("order_routes", __name__)

@order_routes.route('/<int:user_id>', methods=['GET'])
def getOrdersByUserId(user_id):
    """Récupérer les commandes d'un utilisateur via son ID"""
    result = get_orders_by_user_id(user_id)
    return jsonify(result)


@order_routes.route('/details/<int:order_id>', methods=['GET'])
def getOrderDetailsById(order_id):
    """Récupérer les détails d'une commande via son ID"""
    result = get_order_details_by_id(order_id)
    return jsonify(result)

@order_routes.route('/new', methods=['POST'])
def createOrder():
    """Créer une nouvelle commande"""
    data = request.json  

    if "user_id" not in data or "items" not in data:
        return jsonify({"error": "Données incomplètes"}), 400

    result = create_order(user_id=data["user_id"], items=data["items"])
    
    return jsonify(result)