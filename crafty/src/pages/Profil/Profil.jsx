import React, { useState, useEffect, useContext } from 'react';
import { fetchUserDetails, updateUser } from '../../services/UserServices';
import userDefault from '../../assets/user.png';
import Home from '../Home/Home';
import styles from './Profil.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';

const Profil = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            if (user && user.id) {
                const userData = await fetchUserDetails(user.id);
                if (userData) {
                    setUserDetails(userData);
                }
            }
        };
        getUserDetails();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        const updatedUser = await updateUser(user.id, userDetails);
        if (updatedUser) {
            setUserDetails(updatedUser);
            setIsEditing(false);
        }
    };

    if (!userDetails) return <p>Chargement...</p>;

    return (
        <div className={styles.test}>
            <Home />
            <div className={styles.header}>
                <img src={userDetails.avatar || userDefault} alt="Avatar" className={styles.avatar} />
                <div className={styles.infoContainer}>
                    <h2 className={styles.username}>Hello {userDetails.nom}</h2>
                    
                    {isEditing ? (
                        <>
                            <input 
                                name="nom"
                                value={userDetails.nom}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Nom"
                            />
                            <textarea
                                name="description"
                                value={userDetails.description}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Description"
                            />
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="adresse"
                                value={userDetails.adresse}
                                onChange={handleChange}
                                className={styles.inputField}
                                placeholder="Adresse"
                            />
                            <div className={styles.buttonContainer}>
                                <button onClick={handleSave} className={styles.editBtn}>Enregistrer</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={styles.info}><strong>Description:</strong> {userDetails.description}</p>
                            <p className={styles.info}><strong>Email:</strong> {userDetails.email}</p>
                            <p className={styles.info}><strong>Adresse:</strong> {userDetails.adresse}</p>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Modifier</button>
                                <button onClick={() => navigate('/add-product')} className={styles.editBtn}>Ajouter un article</button>
                                <button onClick={() => navigate('/order-history')} className={styles.editBtn}>Voir mes commandes</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profil;
