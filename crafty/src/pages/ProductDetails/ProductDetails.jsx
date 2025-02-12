import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import styles from "./ProductDetails.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setSelectedImage(productData.image1);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageSection}>
        <img src={selectedImage} alt={product.titre} className={styles.mainImage} />
        <div className={styles.thumbnailContainer}>
          {[product.image1, product.image2, product.image3].map((img, index) => (
            img ? (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ) : null
          ))}
        </div>
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.title}>{product.titre}</h1>
        <p className={styles.vendeur}>Vendu par <strong>{product.users.nom}</strong></p>
        <p className={styles.prix}>{product.prix} €</p>
        <button className={styles.addToCart}>Ajouter au panier</button>
        <div className={styles.details}>
          <h3>Détails du produit</h3>
          <p><strong>Catégorie :</strong> {product.categorie}</p>
          <p><strong>Stock :</strong> {product.stock} articles disponibles</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
