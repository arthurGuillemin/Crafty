// Fetch pour récupérer les détails d'un utilisateur
export const fetchUserDetails = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/users/${id}`);
    
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchUserDetails:", error.message);
    return null; 
  }
};
