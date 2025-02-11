from flask import Blueprint, request, jsonify
from services.supabase import create_user, login_user

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/signup", methods=["POST"])
def signup():
    """Créer un compte utilisateur"""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email et mot de passe requis"}), 400
    result = create_user(email, password)
    if result.get("error"):
        return jsonify(result), 400
    return jsonify(result), 201



@auth_routes.route("/login", methods=["POST"])
def login():
    """Connecter un utilisateur"""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email et mot de passe requis"}), 400
    result = login_user(email, password)
    if result.get("error"):
        return jsonify(result), 401

    return jsonify(result), 200
