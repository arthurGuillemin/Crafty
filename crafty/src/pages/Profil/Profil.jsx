import React, { useState, useEffect } from 'react';
import { fetchUserDetails, updateUser } from '../../services/UserServices';
import userDefault from '../../assets/user-default.png'
import Home from '../Home/Home';
import styles from './Profil.module.css';

const Profil = () => {
    const userId = 1; 
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        const getUserDetails = async () => {
            const userData = await fetchUserDetails(userId);
            if (userData) {
                setUser(userData);
            }
        };
        getUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        console.log("Updating user with data:", user); 
        const updatedUser = await updateUser(userId, user);
        
        if (updatedUser) {
            setUser(updatedUser);
            setIsEditing(false);
        }
    };

    if (!user) return <p>Chargement...</p>;

    return (
        <div className={styles.test}>
        <Home />
        <div className={styles.header}>
            <img src={user.avatar || userDefault} alt="Avatar" className={styles.avatar} />
            <h2 className={styles.username}>Hello {user.nom}</h2>
        </div>

        {isEditing ? (
            <>
                <textarea
                    name="description"
                    value={user.description}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="Description"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="adresse"
                    value={user.adresse}
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
                <p className={styles.info}><strong>Description:</strong> {user.description}</p>
                <p className={styles.info}><strong>Email:</strong> {user.email}</p>
                <p className={styles.info}><strong>Adresse:</strong> {user.adresse}</p>
                <div className={styles.buttonContainer}>
                    <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Modifier</button>
                </div>
            </>
        )}
    </div>
    );
};

export default Profil;
