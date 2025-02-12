import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')

    const handleSubmit = (event) =>
        event.preventDefault();

    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Se connecter</button>
            </form>
        </div>
    );
};


export default Login;