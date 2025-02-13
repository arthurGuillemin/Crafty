// Fetch pour ajouter un avis sur un produit
export const addReview = async (reviewData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'avis");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("addReview:", error.message);
    return null;
  }
};

// Fetch pour modifier un avis existant
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification de l'avis");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("updateReview:", error.message);
    return null;
  }
};
