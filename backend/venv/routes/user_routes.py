from flask import Blueprint, jsonify
from services.supabase import get_user_by_id , get_username_by_id

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