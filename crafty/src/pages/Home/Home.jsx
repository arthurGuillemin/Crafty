// src/pages/Home/Home.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { AuthContext } from '../../context/authcontext';

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
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className={styles.homePage}>
      <header className={styles.myHeader}>
        <img className={styles.logo} src={CraftyLogo} alt="logo" onClick={() => navigate('/')} />

        <div className={styles.navContainer}>
          <div className={styles.headerIcons}>
            <button className={styles.Labuttonee} onClick={() => navigate('/cart')}>
              <img src={CartIcon} alt="Cart" className={styles.headerIcons} />
            </button>
            <button className={styles.Labuttonee} onClick={() => navigate('/profil')}>
              <img src={UserIcon} alt="User" className={styles.headerIcons} />
            </button>
          </div>

          <div className={styles.headerButtons}>
            {isAuthenticated ? (
              <button className={styles.myButton} onClick={logout}>Se déconnecter</button>
            ) : (
              <>
                <button className={styles.myButton} onClick={() => setLoginOpen(true)}>Se connecter</button>
                <button className={styles.myButton} onClick={() => setRegisterOpen(true)}>S'inscrire</button>
              </>
            )}
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
