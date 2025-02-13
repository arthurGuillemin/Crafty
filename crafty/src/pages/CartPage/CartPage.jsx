import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';
import Home from '../Home/Home'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);


  // Fonction pour calculer le prix total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  };

  // Fonction pour modifier la quantité
  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  // Fonction pour supprimer un article
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  return (
    <div className={styles.cartPage}>
      <Home/>
      <h1>Mon Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image1} alt={item.titre} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h2>{item.titre}</h2>
                <p>{item.prix} €</p>
                <div className={styles.quantityContainer}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className={styles.removeButton}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className={styles.cartSummary}>
          <p>Total : {calculateTotal()} €</p>
          <Link to="/checkout" className={styles.checkoutButton}>Passer à la caisse</Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
