import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.titre} className={styles.productImage} />
      <h3>{product.titre}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Prix :</strong> {product.prix} €
      </p>
    </div>
  );
};

export default ProductCard;
