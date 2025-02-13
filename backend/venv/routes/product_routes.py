from flask import Blueprint, request, jsonify
from services.supabase import get_all_products , get_product_by_id , get_reviews_by_product_id , get_products_by_seller_id , get_all_categories, get_category_name_by_id , add_product, update_product , delete_product

prod_routes = Blueprint("product_routes", __name__)

@prod_routes.route('/allProducts', methods=['GET'])
def getAllProducts():
    """Récupérer tous les produits"""
    result = get_all_products()
    return jsonify(result)



@prod_routes.route('/products/<int:product_id>', methods=['GET'])
def getProductById(product_id):
    """Récupérer un produit spécifique via son ID"""
    result = get_product_by_id(product_id)
    return jsonify(result)



@prod_routes.route('/reviews/<int:product_id>', methods=['GET'])
def getReviewsByProductId(product_id):
    """Récupérer les avis et évaluations d'un produit via son ID"""
    result = get_reviews_by_product_id(product_id)
    return jsonify(result)


@prod_routes.route('/seller/<int:user_id>', methods=['GET'])
def getProductsBySellerId(user_id):
    """Récupérer tous les produits mis en vente par un utilisateur"""
    result = get_products_by_seller_id(user_id)
    return jsonify(result)


@prod_routes.route('/categories', methods=['GET'])
def getCategories():
    """Récupérer toutes les catégories"""
    result = get_all_categories()
    return jsonify(result)


@prod_routes.route('/categories/<int:category_id>', methods=['GET'])
def getCategoryName(category_id):
    """Récupérer le nom d'une catégorie avec son ID"""
    result = get_category_name_by_id(category_id)
    return jsonify(result)



@prod_routes.route('/add', methods=['POST'])
def addProduct():
    """Ajouter un produit à la vente"""
    data = request.json  

    required_fields = ["vendeur_id", "titre", "description", "prix", "stock", "image1" , "categorie"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Données incomplètes"}), 400

    result = add_product(
        vendeur_id=data["vendeur_id"],
        titre=data["titre"],
        description=data["description"],
        prix=data["prix"],
        categorie = data["categorie"],
        stock=data["stock"],
        image1=data["image1"],
        image2=data["image2"],
        image3=data["image3"]


    )

    return jsonify(result)



@prod_routes.route('/<int:product_id>', methods=['PUT'])
def updateProduct(product_id):
    """Modifier les informations d'un produit"""
    data = request.json  

    if not data:
        return jsonify({"error": "Aucune donnée fournie"}), 400

    result = update_product(product_id, data)

    return jsonify(result)


@prod_routes.route('/<int:product_id>', methods=['DELETE'])
def deleteProduct(product_id):
    """Supprimer un produit à la vente"""
    result = delete_product(product_id)
    return jsonify(result)
