import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import CartIcon from '../../assets/cart-shopping-solid.svg'
import UserIcon from '../../assets/user-solid.svg'


const Home = () => {
    return (
        <div className={styles.homePage}>
            <header className={styles.myHeader} >
                <img src="src\assets\crafty3.png" alt="logo" />
                <article className={styles.rightSide}>
                    <div className={styles.headerIcons}>
                        <button className={styles.Labuttonee}>
                            <img src={CartIcon} alt="Cart" className={styles.myIcon} />
                        </button>
                        <button className={styles.Labuttonee}>
                            <img src={UserIcon} alt="User" className={styles.myIcon} />
                        </button>
                    </div>
                    <div className={styles.headerButtons}>
                        <Link to="/login" className={styles.myButton}>Se connecter</Link>
                        <Link to="/register" className={styles.myButton}>S'inscrire</Link>
                    </div>
                </article>

            </header>
        </div>
    )
}

export default Home;