import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authcontext"; 
import { fetchOrdersByUserId, fetchOrderDetailsById } from "../../services/OrderServices";
import Home from "../../pages/Home/Home";

const OrderHistory = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError("Vous devez être connecté pour voir votre historique de commandes.");
      setLoading(false);
      return;
    }
    const getOrders = async () => {
      const data = await fetchOrdersByUserId(user.id);
      if (data && data.error) {
        if (data.error === "Aucune commande trouvée pour cet utilisateur") {
          setOrders([]); 
          setError(""); 
        } else {
          setError(data.error);
        }
      } else if (data) {
        setOrders(data);
      } else {
        setError("Erreur lors de la récupération des commandes.");
      }
      setLoading(false);
    };
    getOrders();
  }, [isAuthenticated, user]);

  const viewOrderDetails = async (orderId) => {
    const details = await fetchOrderDetailsById(orderId);
    setSelectedOrderDetails(details);
  };

  if (loading) return <p>Chargement des commandes...</p>;
  if (error && error !== "Aucune commande trouvée pour cet utilisateur") return <p>{error}</p>;

  return (
    <>
    <Home/>
    <div>
      <h2>Historique des commandes</h2>
      {orders.length === 0 ? (
        <p>Vous n'avez rien commandé </p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <p>
                <strong>Commande ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong> {order.date_commande}
              </p>
              <p>
                <strong>Total:</strong> {order.total} €
              </p>
              <p>
                <strong>Statut:</strong> {order.statut}
              </p>
              <button onClick={() => viewOrderDetails(order.id)}>Voir détails</button>
            </li>
          ))}
        </ul>
      )}

      {selectedOrderDetails && (
        <div style={{ marginTop: "30px", border: "1px solid #aaa", padding: "15px" }}>
          <h3>Détails de la commande</h3>
          <ul>
            {selectedOrderDetails.map((item) => (
              <li key={item.id}>
                <p>
                  <strong>Produit ID:</strong> {item.product_id}
                </p>
                <p>
                  <strong>Quantité:</strong> {item.quantite}
                </p>
                <p>
                  <strong>Prix unitaire:</strong> {item.prix} €
                </p>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedOrderDetails(null)}>Fermer</button>
        </div>
      )}
    </div>
    </>
  );
};

export default OrderHistory;
