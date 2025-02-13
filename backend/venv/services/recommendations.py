from flask import request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.stats import pearsonr
from services.supabase import supabase_client

def recommend_products(search_query):
    """Recommander des produits similaires à la recherche de l'utilisateur"""
    try:
        #  Récupérer les descriptions des produits depuis la bdd
        response = supabase_client.table("products").select("id, titre, description").execute()

        if not response.data:
            return {"error": "Aucun produit trouvé"}

        # Construire le corpus (Recherche + Descriptions Produits)
        texts = [search_query] + [p["description"] for p in response.data]

        # Vectorisation TF-IDF
        vect = TfidfVectorizer()
        tfidf_mat = vect.fit_transform(texts).toarray()

        query_vector = tfidf_mat[0]  # Vecteur de la requête utilisateur
        product_vectors = tfidf_mat[1:]  # Vecteurs des produits

        # Calcul de la corzlation de Pearson entre la requete et chaque produit
        recommended_products = []
        for idx, product_vector in enumerate(product_vectors):
            pearson_corr, _ = pearsonr(query_vector, product_vector)
            
            if pearson_corr > 0.20:  #similarité de 20 % ( a peut etre changer mais opur l'instnt ne pas toucher)
                recommended_products.append({
                    "id": response.data[idx]["id"],
                    "titre": response.data[idx]["titre"],
                    "description": response.data[idx]["description"],
                    "similarity": pearson_corr
                })

        return {"results": recommended_products}

    except Exception as e:
        return {"error": str(e)}
