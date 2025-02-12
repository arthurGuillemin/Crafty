import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Catalogue.module.css';
import Home from '../Home/Home';


const mockProducts = [
  {
    id: 1,
    titre: 'Écharpe en crochet',
    description: 'Écharpe faite main en laine douce.',
    prix: 25,
    image: '/public/echarpeCrochet.jpg',
  },
  {
    id: 2,
    titre: 'Tableau abstrait',
    description: 'Peinture unique sur toile de lin.',
    prix: 120,
    image: '/public/tableauAbstrait.jpg',
  },
  {
    id: 3,
    titre: 'Sac à main en cuir',
    description: 'Sac artisanal fait main avec du cuir local.',
    prix: 75,
    image: '/public/sacCuir.jpg',
  },
  {
    id: 4,
    titre: 'Bougie parfumée',
    description: 'Bougie artisanale à base de cire naturelle.',
    prix: 20,
    image: '/public/bougie.jpg',
  },
  {
    id: 5,
    titre: 'Vase en céramique',
    description: 'Vase fait main avec une finition brillante.',
    prix: 45,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    titre: 'Bracelet en perles',
    description: 'Bracelet fait main avec des perles naturelles.',
    prix: 30,
    image: 'https://via.placeholder.com/150',
  },
];

const Catalogue = () => {
  const [products] = useState(mockProducts);

  return (
    <div className={styles.catalogueContainer}>
      <Home />
      <h1>Catalogue des Produits</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
