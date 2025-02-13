import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Modal from '../Home/Modal';

import BasketIcon from '../../assets/basket.svg';
import UserIcon from '../../assets/user.svg';
import CraftyLogo from '../../assets/crafty3.png'; 

const Home = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={styles.homePage}>
            <header className={styles.myHeader}>
                {/* Logo poussé à gauche */}
                <img className={styles.logo} src={CraftyLogo} alt="logo" onClick={() => navigate('/')} />

                <div className={styles.navContainer}>
                    {/* Icônes et boutons alignés à droite */}
                    <div className={styles.headerIcons}>
                        <button className={styles.Labuttonee} onClick={() => navigate('/cart')}>
                            <img src={BasketIcon} alt="Cart" className={styles.headerIcons} />
                        </button>
                        <button className={styles.Labuttonee} onClick={() => navigate('/profil')}>
                            <img src={UserIcon} alt="User" className={styles.headerIcons} />
                        </button>
                    </div>

                    <div className={styles.headerButtons}>
                        <button className={styles.myButton} onClick={() => setLoginOpen(true)}>Se connecter</button>
                        <button className={styles.myButton} onClick={() => setRegisterOpen(true)}>S'inscrire</button>
                    </div>
                </div>
            </header>
            <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
                <Login />
            </Modal>
            <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
                <Register />
            </Modal>
        </div>
    );
};

export default Home;
