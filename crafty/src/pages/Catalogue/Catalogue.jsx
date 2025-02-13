import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Catalogue.module.css';
import Home from '../Home/Home';
import { fetchAllProducts } from '../../services/productServices';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch {
        setError('Erreur de chargement des produits.');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className={styles.catalogueContainer}>
      <Home />
      <div className={styles.productGrid}>
        {loading ? <p>Chargement...</p> : error ? <p>{error}</p> : (
          products.length ? (
            products.map(product => <ProductCard key={product.id} product={product} />)
          ) : <p>Aucun produit disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogue;