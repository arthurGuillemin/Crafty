from flask import Blueprint, request, jsonify
from services.recommendations import recommend_products

recommend_routes = Blueprint("recommend_routes", __name__)

@recommend_routes.route('/recommend', methods=['GET'])
def recommend():
    """Endpoint pour obtenir des recommandations"""
    query = request.args.get("query", "")
    if not query:
        return jsonify({"error": "Veuillez fournir un mot-clé"}), 400

    result = recommend_products(query)
    return jsonify(result)
