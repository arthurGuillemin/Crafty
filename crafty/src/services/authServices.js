// Fetch pour l'inscription d'un utilisateur
export const signup = async (userData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("signup:", error.message);
    return null;
  }
};

// Fetch pour la connexion d'un utilisateur
export const login = async (credentials) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("login:", error.message);
    return null;
  }
};
