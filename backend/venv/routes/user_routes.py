from flask import Blueprint, jsonify , request
from services.supabase import get_user_by_id , get_username_by_id , update_user , delete_user

user_routes = Blueprint("user_routes", __name__)

@user_routes.route('/<int:user_id>', methods=['GET'])
def getUserById(user_id):
    """Récupérer un utilisateur spécifique via son ID"""
    result = get_user_by_id(user_id)
    return jsonify(result)

@user_routes.route('/<int:user_id>/name', methods=['GET'])
def getUserNameById(user_id):
    """Récupérer uniquement le nom d'un utilisateur via son ID"""
    result = get_username_by_id(user_id)
    return jsonify(result)


@user_routes.route('/<int:user_id>', methods=['DELETE'])
def deleteUser(user_id):
    """Supprimer un utilisateur"""
    result = delete_user(user_id)
    return jsonify(result)


@user_routes.route('/<int:user_id>', methods=['PUT'])
def updateUser(user_id):
    """Modifier les informations d'un utilisateur"""
    data = request.json  
    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400
    result = update_user(user_id, data)

    return jsonify(result)


