import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

const mockProducts = [
    {
        id: 1,
        titre: "Écharpe en crochet",
        description: "Écharpe faite main en laine douce.",
        prix: 25,
        image: "/public/echarpeCrochet.jpg",
        categorie: "Accessoires",
        vendeur: "Alice Créations",
        stock: 5,
        images: [
            "/public/echarpeCrochet.jpg",
            "/public/sacCuir.jpg",
            "/public/bougie.jpg",
        ],
    },
    {
        id: 2,
        titre: "Tableau abstrait",
        description: "Peinture unique sur toile de lin.",
        prix: 120,
        image: "/public/tableauAbstrait.jpg",
        categorie: "Décoration",
        vendeur: "Atelier Vincent",
        stock: 2,
        images: [
            "/public/tableauAbstrait.jpg",
            "/public/vase.jpg",
            "/public/bracelet.jpg",
        ],
    },
];

const ProductDetail = () => {
    const { id } = useParams();
    const product = mockProducts.find((p) => p.id === Number(id));
    const [mainImage, setMainImage] = useState(product?.image);

    if (!product) {
        return <p>Produit non trouvé.</p>;
    }

    return (
        <div className={styles.productDetail}>
            <div className={styles.imageSection}>
                <img src={mainImage} alt={product.titre} className={styles.mainImage} />
                <div className={styles.thumbnailContainer}>
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Miniature"
                            className={`${styles.thumbnail} ${mainImage === img ? styles.activeThumbnail : ""}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.infoSection}>
                <h1 className={styles.title}>{product.titre}</h1>
                <p className={styles.vendeur}>Vendu par <strong>{product.vendeur}</strong></p>
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
