from flask import Blueprint, request, jsonify
from services.supabase import add_review , update_review

review_routes = Blueprint("review_routes", __name__)

@review_routes.route('/add', methods=['POST'])
def addReview():
    """Ajouter un commentaire sur un produit"""
    data = request.json  

    required_fields = ["product_id", "user_id", "note", "commentaire"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Données incomplètes"}), 400

    result = add_review(
        product_id=data["product_id"],
        user_id=data["user_id"],
        note=data["note"],
        commentaire=data["commentaire"]
    )

    return jsonify(result)


@review_routes.route('/<int:review_id>', methods=['PUT'])
def updateReview(review_id):
    """Modifier un commentaire"""
    data = request.json  

    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400

    result = update_review(review_id, data)

    return jsonify(result)
