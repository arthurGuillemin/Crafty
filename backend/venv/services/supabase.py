import os
from dotenv import load_dotenv
from supabase import create_client , Client
from werkzeug.security import generate_password_hash, check_password_hash

# Charger les variables d'environnement
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)

#test
def test_db_connection():
    """Teste la connexion à la base de données en récupérant un élément."""
    try:
        response = supabase_client.table("users").select("*").execute()
        return response.data 
    except Exception as e:
        return {"error": str(e)}
    


#Utilisateurs
def create_user(nom, email, mot_de_passe):
    """Créer un nouvel utilisateur dans la base de données"""
    hashed_password = generate_password_hash(mot_de_passe) 

    response = supabase_client.table("users").insert({
        "nom": nom,  
        "email": email,
        "mot_de_passe": hashed_password  
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

def get_user_by_id(user_id):
    """Récupérer un utilisateur spécifique par son ID"""
    try:
        response = supabase_client.table("users").select("*").eq("id", user_id).single().execute()

        if not response.data:  
            return {"error": "Utilisateur non trouvé"}

        return response.data 

    except Exception as e:
        return {"error": str(e)}  
    

def get_username_by_id(user_id):
    """Récupérer uniquement le nom d'un utilisateur par son ID"""
    try:
        response = supabase_client.table("users").select("nom").eq("id", user_id).single().execute()

        if not response.data: 
            return {"error": "Utilisateur non trouvé"}

        return {"name": response.data["nom"]} 

    except Exception as e:
        return {"error": str(e)} 





#Produits

def get_all_products():
    """Récupérer tous les produits de la base Supabase"""
    try:
        response = supabase_client.table("products").select("*").execute()
        if not response.data: 
            return {"error": "Erreur lors de la récupération des produits"}
        return response.data  

    except Exception as e:
        return {"error": str(e)}
    

def get_product_by_id(product_id):
    """Récupérer un produit spécifique par son ID"""
    try:
        response = supabase_client.table("products").select("*").eq("id", product_id).single().execute()
        if not response.data:  
            return {"error": "Produit non trouvé"}
        return response.data 
    except Exception as e:
        return {"error": str(e)}  

def get_reviews_by_product_id(product_id):
    """Récupérer les commentaires et évaluations d'un produit par son ID"""
    try:
        response = supabase_client.table("reviews").select("*").eq("product_id", product_id).execute()

        if not response.data: 
            return {"error": "Aucun avis trouvé pour ce produit"}

        return response.data

    except Exception as e:
        return {"error": str(e)}  
