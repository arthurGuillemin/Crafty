from flask import Blueprint, request, jsonify
from services.supabase import get_all_products , get_product_by_id

prod_routes = Blueprint("product_routes", __name__)

@prod_routes.route('/allProducts', methods=['GET'])
def getAllProducts():
    """Récupérer tous les produits"""
    result = get_all_products()
    return jsonify(result)



@prod_routes.route('/products/<int:product_id>', methods=['GET'])
def getProductById(product_id):
    """Récupérer un produit spécifique via son ID"""
    result = get_product_by_id(product_id)
    return jsonify(result)

