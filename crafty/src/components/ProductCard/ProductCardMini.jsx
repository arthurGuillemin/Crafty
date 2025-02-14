import { useNavigate } from "react-router-dom";
import styles from './ProductCardMini.module.css';

const ProductCardMini = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={product.image1} alt={product.titre} className={styles.image} />
      <h4>{product.titre}</h4>
    </div>
  );
};

export default ProductCardMini;
