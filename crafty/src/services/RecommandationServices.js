// Fetch pour obtenir des recommandations de produits
export const fetchRecommendations = async (query) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/reco/recommend?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des recommandations");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchRecommendations:", error.message);
    return null;
  }
};
