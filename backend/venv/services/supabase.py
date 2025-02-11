import os
from dotenv import load_dotenv
from supabase import create_client , Client
from werkzeug.security import generate_password_hash, check_password_hash


# Charger les variables d'environnement
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialisation du client Supabase
supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)


def test_db_connection():
    """Teste la connexion à la base de données en récupérant un élément."""
    try:
        response = supabase_client.table("users").select("*").execute()
        return response.data 
    except Exception as e:
        return {"error": str(e)}
    

def create_user(email, password):
    """Créer un nouvel utilisateur dans la base de données"""
    hashed_password = generate_password_hash(password)
    response = supabase_client.table('users').insert({"email": email, "password": hashed_password}).execute()
    if response.get('error'):
        return {"error": "Erreur lors de la création de l'utilisateur"}
    return {"message": "Utilisateur créé avec succès"}

def login_user(email, password):
    """Vérifier les informations d'identification de l'utilisateur"""
    response = supabase_client.table('users').select("*").eq('email', email).execute()
    if response.get('error') or len(response['data']) == 0:
        return {"error": "Email ou mot de passe incorrect"}
    user = response['data'][0]
    if not check_password_hash(user['password'], password):
        return {"error": "Email ou mot de passe incorrect"}
    return {"message": "Connexion réussie"}
