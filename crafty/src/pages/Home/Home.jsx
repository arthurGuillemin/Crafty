import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Modal from '../Home/Modal';

import CartIcon from '../../assets/cart-shopping-solid.svg';
import UserIcon from '../../assets/user-solid.svg';
import CraftyLogo from '../../assets/crafty3.png'; 

const Home = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className={styles.homePage}>
      <header className={styles.myHeader}>
                <img src={CraftyLogo} alt="logo" />
                <article className={styles.rightSide}>
                <div className={styles.headerIcons}>
                        <button className={styles.Labuttonee}>
                            <img src={CartIcon} alt="Cart" className={styles.myIcon} />
                        </button>
                        <button className={styles.Labuttonee} onClick={() => navigate('/profil')}>
                            <img src={UserIcon} alt="User" className={styles.myIcon} />
                        </button>
                    </div>
                    <div className={styles.headerButtons}>
                        <button className={styles.myButton} onClick={() => setLoginOpen(true)}>Se connecter</button>
                        <button className={styles.myButton} onClick={() => setRegisterOpen(true)}>S'inscrire</button>
                        <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
                            <Login />
                        </Modal>
                        <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
                            <Register />
                        </Modal>
                    </div>
                </article>
            </header>
    </div>
  );
};

export default Home;
