import os
from dotenv import load_dotenv
from supabase import create_client , Client
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)

#       test       #

#Routes GET
def test_db_connection():
    """Teste la connexion à la base de données en récupérant un élément."""
    try:
        response = supabase_client.table("users").select("*").execute()
        return response.data 
    except Exception as e:
        return {"error": str(e)}
    


#       Utilisateurs       #


#Routes GET

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
    
#routes Update

def update_user(user_id, updated_data):
    """Modifier les informations d'un utilisateur"""
    try:
        response = supabase_client.table("users") \
            .update(updated_data) \
            .eq("id", user_id) \
            .execute()

        if response.data:
            return {"message": "Utilisateur mis à jour avec succès", "user": response.data}

        return {"error": "Aucune modification effectuée ou utilisateur introuvable"}

    except Exception as e:
        return {"error": str(e)}



# Routes DELETE 

def delete_user(user_id):
    """Supprimer un utilisateur"""
    try:
        response = supabase_client.table("users") \
            .delete() \
            .eq("id", user_id) \
            .execute()

        if response.data:
            return {"message": "Utilisateur supprimé avec succès"}

        return {"error": "Utilisateur introuvable ou déjà supprimé"}

    except Exception as e:
        return {"error": str(e)}



#       Produits       #


#Routes GET


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


def get_products_by_seller_id(user_id):
    """Récupérer tous les produits en vente d'un utilisateur par son ID"""
    try:
        response = supabase_client.table("products").select("id, name, description, price, stock, created_at").eq("seller_id", user_id).execute()

        if not response.data: 
            return {"error": "Aucun produit trouvé pour cet utilisateur"}

        return response.data 

    except Exception as e:
        return {"error": str(e)}
    
def get_all_categories():
    """Récupérer toutes les catégories"""
    try:
        response = supabase_client.table("categories").select("*").execute()
        
        if response.data:
            return response.data

        return {"error": "Aucune catégorie trouvée"}

    except Exception as e:
        return {"error": str(e)}
    

def get_category_name_by_id(category_id):
    """Récupérer le nom d'une catégorie par son ID"""
    try:
        response = supabase_client.table("categories").select("nom").eq("id", category_id).single().execute()
        
        if response.data:
            return {"nom": response.data["nom"]}

        return {"error": "Catégorie non trouvée"}

    except Exception as e:
        return {"error": str(e)}
    

#Routes POST


def add_product(vendeur_id, titre, description, categorie , prix, stock, image1 , image2 , image3):
    """Ajouter un produit à la vente"""
    try:
        response = supabase_client.table("products").insert({
            "vendeur_id": vendeur_id,
            "titre": titre,
            "description": description,
            "prix": prix,
            "categorie" : categorie,
            "stock": stock,
            "image1": image1,
            "image2": image2,
            "image3": image3,
        }).execute()

        if response.data:
            return {"message": "Produit ajouté avec succès", "product": response.data}

        return {"error": "Erreur lors de l'ajout du produit"}

    except Exception as e:
        return {"error": str(e)} 


#Routes PUT 

def update_product(product_id, updated_data):
    """Modifier les informations d'un produit"""
    try:
        response = supabase_client.table("products") \
            .update(updated_data) \
            .eq("id", product_id) \
            .execute()

        if response.data:
            return {"message": "Produit mis à jour avec succès", "product": response.data}

        return {"error": "Aucune modification effectuée ou produit introuvable"}

    except Exception as e:
        return {"error": str(e)}
    

#Routes DELETE

def delete_product(product_id):
    """Supprimer un produit à la vente"""
    try:
        response = supabase_client.table("products") \
            .delete() \
            .eq("id", product_id) \
            .execute()

        if response.data:
            return {"message": "Produit supprimé avec succès"}

        return {"error": "Produit introuvable ou déjà supprimé"}

    except Exception as e:
        return {"error": str(e)}



    

#       Commandes       #


#Routes GET


def get_orders_by_user_id(user_id):
    """Récupérer les commandes d'un utilisateur par son ID"""
    try:
        response = supabase_client.table("orders").select("*").eq("user_id", user_id).execute()

        if not response.data:  
            return {"error": "Aucune commande trouvée pour cet utilisateur"}

        return response.data  

    except Exception as e:
        return {"error": str(e)} 


def get_order_details_by_id(order_id):
    """Récupérer les détails d'une commande par son ID"""
    try:
        response = supabase_client.table("order_items").select("*").eq("order_id", order_id).execute()

        if not response.data:
            return {"error": "Aucune information trouvée pour cette commande"}

        return response.data 

    except Exception as e:
        return {"error": str(e)} 
    


#Routes POST


def create_order(user_id, items):
    """Créer une nouvelle commande"""
    try:
        total_price = sum(item["prix"] * item["quantite"] for item in items)

        response_order = supabase_client.table("orders").insert({
            "user_id": user_id,
            "total": total_price,
            "date_commande": datetime.utcnow().isoformat(),
            "statut": "en attente"  
        }).execute()

        if not response_order.data:
            return {"error": "Erreur lors de la création de la commande"}

        order_id = response_order.data[0]["id"]

        order_items_data = [
            {
                "order_id": order_id,
                "product_id": item["product_id"],
                "quantite": item["quantite"],
                "prix": item["prix"]
            }
            for item in items
        ]

        response_items = supabase_client.table("order_items").insert(order_items_data).execute()

        if response_items.data:
            return {"message": "Commande créée avec succès", "order_id": order_id}

        return {"error": "Erreur lors de l'ajout des produits à la commande"}

    except Exception as e:
        return {"error": str(e)}
        
    


#       commentaires       #


#Routes GET

def get_reviews_by_product_id(product_id):
    """Récupérer les commentaires et évaluations d'un produit par son ID"""
    try:
        response = supabase_client.table("reviews").select("*").eq("product_id", product_id).execute()

        if not response.data: 
            return {"error": "Aucun avis trouvé pour ce produit"}

        return response.data

    except Exception as e:
        return {"error": str(e)} 
    
#Routes POST


def add_review(product_id, user_id, note, commentaire):
    """Ajouter un commentaire sur un produit"""
    try:
        response = supabase_client.table("reviews").insert({
            "product_id": product_id,
            "user_id": user_id,
            "note": note,
            "commentaire": commentaire,
            "date": datetime.now().isoformat()  
        }).execute()

        if response.data:
            return {"message": "Commentaire ajouté avec succès", "review": response.data}

        return {"error": "Erreur lors de l'ajout du commentaire"}

    except Exception as e:
        return {"error": str(e)}

def update_review(review_id, updated_data):
    """Modifier un commentaire existant"""
    try:
        response = supabase_client.table("reviews") \
            .update(updated_data) \
            .eq("id", review_id) \
            .execute()

        if response.data:
            return {"message": "Commentaire mis à jour avec succès", "review": response.data}

        return {"error": "Aucune modification effectuée ou commentaire introuvable"}

    except Exception as e:
        return {"error": str(e)}


