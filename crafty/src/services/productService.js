import supabase from "./supabaseClient";

// Récupérer tous les produits
export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error("Erreur lors de la récupération des produits");
  return data;
};

// Récupérer un produit par son ID
export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, users(nom)")
    .eq("id", productId)
    .single();

  if (error) throw new Error("Produit non trouvé");
  return data;
};

// Récupérer les avis d’un produit
export const getReviewsByProductId = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId);

  if (error) throw new Error("Aucun avis trouvé pour ce produit");
  return data;
};
