from flask import Blueprint, request, jsonify
from services.recommendations import recommend_products

recommend_routes = Blueprint("recommend_routes", __name__)

@recommend_routes.route('/recommend', methods=['GET'])
def recommend():
    """Endpoint pour obtenir des recommandations avec plusieurs mots-clés"""
    query = request.args.get("query", "").strip()

    if not query:
        return jsonify({"error": "Veuillez fournir un mot-clé"}), 400

    # Séparer les mots-clés pour améliorer la recherche
    keywords = query.split()

    result = recommend_products(keywords)
    return jsonify(result)
