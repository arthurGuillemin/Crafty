from flask import request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.stats import pearsonr
from services.supabase import supabase_client

def recommend_products(keywords):
    """Recommander des produits similaires à la recherche de l'utilisateur"""
    try:
        # Récupérer les descriptions des produits depuis la BDD
        response = supabase_client.table("products").select("id, titre, description").execute()

        if not response.data:
            return {"error": "Aucun produit trouvé"}

        # Concaténer les mots-clés en une phrase (meilleur matching TF-IDF)
        query_text = " ".join(keywords)

        # Construire le corpus (Recherche + Descriptions Produits)
        texts = [query_text] + [p["description"] for p in response.data]

        # Vectorisation TF-IDF
        vect = TfidfVectorizer()
        tfidf_mat = vect.fit_transform(texts).toarray()

        query_vector = tfidf_mat[0]  # Vecteur de la requête utilisateur
        product_vectors = tfidf_mat[1:]  # Vecteurs des produits

        # Calcul de la corrzlation de Pearson 
        recommended_products = []
        for idx, product_vector in enumerate(product_vectors):
            pearson_corr, _ = pearsonr(query_vector, product_vector)

            if pearson_corr > 0.20:  # Seuil de similarité à ajuster si nécessaire
                recommended_products.append({
                    "id": response.data[idx]["id"],
                    "titre": response.data[idx]["titre"],
                    "description": response.data[idx]["description"],
                    "similarity": pearson_corr
                })

        return {"results": recommended_products}

    except Exception as e:
        return {"error": str(e)}
