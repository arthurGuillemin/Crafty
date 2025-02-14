import { useEffect, useState } from "react";
import { fetchRecommendations } from "../../services/RecommandationServices";
import ProductCardMini from "./ProductCardMini";
import styles from './reco.module.css'

const ProductRecommendations = ({ description, excludeProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      if (!description) return;
      const data = await fetchRecommendations(description);
      if (data?.results) {
        setRecommendations(data.results);
      } else {
        setError("Aucune recommandation trouvée.");
      }
    };
    getRecommendations();
  }, [description]);

  const filteredRecommendations = recommendations.filter(
    (rec) => rec.id !== excludeProductId
  );

  return (
    <div>
      <h3>Produits similaires</h3>
      {error && <p>{error}</p>}
      <div className={styles.recommendationsList}>
        {recommendations.map((product) => (
          <ProductCardMini key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
