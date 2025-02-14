import { useState, useEffect } from 'react';
import { addProduct } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import styles from './AddProduct.module.css';
import Home from '../Home/Home';

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        titre: '',
        description: '',
        prix: '',
        categorie: '',
        stock: '',
        image1: '',
        image2: '',
        image3: ''
    });

    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        if (!userId) {
            alert("Vous devez être connecté pour ajouter un produit.");
            navigate("/login");
        }
    }, [navigate, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productWithUserId = { ...product, vendeur_id: userId };

        const result = await addProduct(productWithUserId);
        if (result) {
            alert('Produit ajouté avec succès');
            navigate('/');
        } else {
            alert('Erreur lors de l\'ajout du produit');
        }
    };

    return (
        <div className={styles.addProductContainer}>
            <Home />
            <h2 className={styles.addProductHeader}>Ajouter un nouvel article</h2>
            <form onSubmit={handleSubmit} className={styles.addProductForm}>
                <input
                    type="text"
                    name="titre"
                    value={product.titre}
                    onChange={handleChange}
                    placeholder="Titre"
                    required
                />
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="prix"
                    value={product.prix}
                    onChange={handleChange}
                    placeholder="Prix"
                    required
                />
                <input
                    type="text"
                    name="categorie"
                    value={product.categorie}
                    onChange={handleChange}
                    placeholder="Catégorie"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                />
                <input
                    type="text"
                    name="image1"
                    value={product.image1}
                    onChange={handleChange}
                    placeholder="Image 1 URL"
                />
                <input
                    type="text"
                    name="image2"
                    value={product.image2}
                    onChange={handleChange}
                    placeholder="Image 2 URL"
                />
                <input
                    type="text"
                    name="image3"
                    value={product.image3}
                    onChange={handleChange}
                    placeholder="Image 3 URL"
                />
                <button type="submit">Ajouter le produit</button>
            </form>
        </div>
    );
};

export default AddProduct;
