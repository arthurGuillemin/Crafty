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
    

from werkzeug.security import generate_password_hash
from services.supabase import supabase_client

def create_user(nom, email, mot_de_passe):
    """Créer un nouvel utilisateur dans la base de données"""
    hashed_password = generate_password_hash(mot_de_passe)  # Hachage du mot de passe

    response = supabase_client.table("users").insert({
        "nom": nom,  # Ajout du champ nom
        "email": email,
        "mot_de_passe": hashed_password  # Stocker le mot de passe haché
    }).execute()

    if response.get('error'):
        return {"error": "Erreur lors de la création de l'utilisateur"}
    
    return {"message": "Utilisateur créé avec succès"}

def login_user(email, mot_de_passe):
    """Vérifier les informations d'identification de l'utilisateur"""
    response = supabase_client.table("users").select("*").eq("email", email).execute()
    if response.get('error') or len(response['data']) == 0:
        return {"error": "Email ou mot de passe incorrect"}
    user = response['data'][0]
    if not check_password_hash(user['mot_de_passe'], mot_de_passe):
        return {"error": "Email ou mot de passe incorrect"}
    return {"message": "Connexion réussie"}
