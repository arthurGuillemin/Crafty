import React, { useState, useEffect } from 'react';
import { fetchUserDetails, updateUser } from '../../services/UserServices';

const Profil = () => {
    const userId = 1; // ID de l'utilisateur à récupérer (à modifier selon le contexte)
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
        const updatedUser = await updateUser(userId, user);
        if (updatedUser) {
            setUser(updatedUser);
            setIsEditing(false);
        }
    };

    if (!user) return <p>Chargement...</p>;

    return (
        <div>
            <img src={user.avatar || ''} alt="Avatar" />
            <h2 className="Hello">Hello {user.nom}</h2>
            {isEditing ? (
                <>
                    <textarea name="description" value={user.description} onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="border p-2 w-full mb-2" />
                    <input type="text" name="adresse" value={user.adresse} onChange={handleChange} className="border p-2 w-full mb-2" />
                    <button onClick={handleSave} className="SaveBtn">Enregistrer</button>
                </>
            ) : (
                <>
                    <p>Description : {user.description}</p>
                    <p>Email : {user.email}</p>
                    <p>Adresse : {user.adresse}</p>
                    <button onClick={() => setIsEditing(true)} className="ModifBtn">Modifier</button>
                </>
            )}
        </div>
    );
};

export default Profil;
