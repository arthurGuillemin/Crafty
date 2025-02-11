from flask import Blueprint, jsonify
from services.supabase import test_db_connection

test_routes = Blueprint("test_routes", __name__)

@test_routes.route("/test-db", methods=["GET"])
def test_db():
    """Endpoint pour tester la connexion à Supabase"""
    result = test_db_connection()
    return jsonify(result)  # Maintenant, result est bien JSON sérialisable
