// Fetch pour récupérer tous les produits
export const fetchAllProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/allProducts");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchAllProducts:", error.message);
    return null;
  }
};

// Fetch pour récupérer un produit spécifique par ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/products/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du produit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchProductById:", error.message);
    return null;
  }
};

// Fetch pour récupérer les avis d'un produit spécifique par ID
export const fetchReviewsByProductId = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/reviews/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des avis");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchReviewsByProductId:", error.message);
    return null;
  }
};

// Fetch pour récupérer les produits d'un vendeur par ID
export const fetchProductsBySellerId = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/seller/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits du vendeur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchProductsBySellerId:", error.message);
    return null;
  }
};

// Fetch pour récupérer toutes les catégories
export const fetchCategories = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/categories");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchCategories:", error.message);
    return null;
  }
};

// Fetch pour récupérer une catégorie par ID
export const fetchCategoryById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/categories/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la catégorie");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchCategoryById:", error.message);
    return null;
  }
};

// Fetch pour ajouter un produit
export const addProduct = async (productData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du produit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("addProduct:", error.message);
    return null;
  }
};

// Fetch pour mettre à jour un produit
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du produit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("updateProduct:", error.message);
    return null;
  }
};

// Fetch pour supprimer un produit
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("deleteProduct:", error.message);
    return null;
  }
};
