// Fetch pour récupérer les commandes d'un utilisateur par ID
export const fetchOrdersByUserId = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/${userId}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des commandes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchOrdersByUserId:", error.message);
    return null;
  }
};

// Fetch pour récupérer les détails d'une commande par ID
export const fetchOrderDetailsById = async (orderId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/orders/details/${orderId}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails de la commande");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchOrderDetailsById:", error.message);
    return null;
  }
};

// Fetch pour créer une nouvelle commande
export const createOrder = async (orderData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/orders/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la commande");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("createOrder:", error.message);
    return null;
  }
};
