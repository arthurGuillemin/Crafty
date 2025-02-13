import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { image1 = '/placeholder.png', titre = 'Produit inconnu', description = 'Pas de description', prix = 'Prix indisponible' } = product;

  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <div className={styles.productCard}>
        <img src={image1} alt={titre} className={styles.productImage} />
        <h3>{titre}</h3>
        <p>{description}</p>
        <p><strong>Prix :</strong> {prix} €</p>
      </div>
    </Link>
  );
};

export default ProductCard;