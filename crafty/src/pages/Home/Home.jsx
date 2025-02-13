import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import CartIcon from '../../assets/cart-shopping-solid.svg';
import UserIcon from '../../assets/user-solid.svg';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <header className={styles.myHeader}>
        <img src="src/assets/crafty3.png" alt="logo" className={styles.logo} />
        <div className={styles.navContainer}>
          <div className={styles.headerIcons}>
            <img src={CartIcon} alt="Panier" className={styles.myIcon} />
            <img src={UserIcon} alt="Utilisateur" className={styles.myIcon} />
          </div>
          <div className={styles.headerButtons}>
            <Link to="/login" className={styles.myButton}>Se connecter</Link>
            <Link to="/register" className={styles.myButton}>S'inscrire</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
