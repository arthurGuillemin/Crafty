import { useEffect, useState } from "react";
import { fetchRecommendations } from "../../services/RecommandationServices";
import ProductCard from "../ProductCard/ProductCard";

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
      <div>
        {filteredRecommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
