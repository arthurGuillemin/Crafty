import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Catalogue.module.css';
import Home from '../Home/Home';

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.catalogueContainer}>
      <Home />
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
