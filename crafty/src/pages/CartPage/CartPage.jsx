import { useState, useEffect } from 'react';
import styles from './CartPage.module.css';
import Home from '../Home/Home'
import { createOrder } from '../../services/OrderServices';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleOrderSubmit = async () => {
    const userId = 1;

    const orderData = {
      userId: userId,
      totalAmount: calculateTotal(),
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.prix
      }))
    };

    const orderResponse = await createOrder(orderData);

    if (orderResponse) {
      alert("Commande passée avec succès!");
      localStorage.removeItem('cart');
      setCartItems([]);
    } else {
      alert("Erreur lors de la création de la commande.");
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  return (
<div className={styles.cartPage}>
  <Home />
  <div className={styles.cartItems}>
    <h1>Mon Panier</h1>
    {cartItems.length === 0 ? (
      <p>Votre panier est vide.</p>
    ) : (
      <div>
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
  </div>

  {cartItems.length > 0 && (
    <div className={styles.cartSummary}>
      <h1>Résumé</h1>
      <p>{cartItems.length} produit{cartItems.length > 1 ? 's' : ''}</p>
      <p>Total : {calculateTotal()} €</p>
      <button onClick={handleOrderSubmit} className={styles.checkoutButton}>Passer commande</button>
    </div>
  )}
</div>


  );
};

export default CartPage;
