import React, { useState } from "react";
import { signup } from "../../services/authServices";  

const Register = () => {
    const [nom, setNom] = useState("");  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { nom, email, mot_de_passe: password };
        const result = await signup(userData);

        if (result) {
            console.log("Inscription réussie !");
        } else {
            console.log("Erreur lors de l'inscription.");
        }
    };

    return (
        <div>
            <h1>S'inscrire</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input 
                        type="text" 
                        id="nom" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
