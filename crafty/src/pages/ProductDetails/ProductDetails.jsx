import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productServices';
import styles from './ProductDetails.module.css';
import Home from '../Home/Home';
import ProductRecommendations from '../../components/ProductCard/reco';
import { AuthContext } from '../../context/authcontext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.image1 || '/placeholder.png');
        } else {
          setError('Produit non trouvé.');
        }
      } catch {
        setError('Erreur lors du chargement du produit.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produit introuvable.</p>;


  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = existingCart.find(item => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Produit ajouté au panier');
  };

  return (
    <>
      <div className={styles.productDetail}>
        <Home />
        <div className={styles.imageSection}>
          <img src={selectedImage} alt={product.titre} className={styles.mainImage} />
          <div className={styles.thumbnailContainer}>

            {[product.image1, product.image2, product.image3].filter(Boolean).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniature ${index + 1}`}
                className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.titre}</h1>
          <p className={styles.vendeur}>Vendu par <strong>{product.users?.nom || 'Inconnu'}</strong></p>
          <p className={styles.prix}>{product.prix} €</p>
          <button className={styles.addToCart} onClick={addToCart}>Ajouter au panier</button>
          <div className={styles.details}>
            <h3>Détails du produit</h3>
            <p><strong>Catégorie :</strong> {product.categorie || 'Non spécifiée'}</p>
            <p><strong>Stock :</strong> {product.stock || 0} articles disponibles</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <ProductRecommendations description={product.description} />
    </>

  );
}

export default ProductDetail;
