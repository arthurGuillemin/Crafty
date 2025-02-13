import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const credentials = { email, password };
    const response = await login(credentials);

    if (response && response.token) {
      localStorage.setItem("token", response.token);
      window.location.reload();
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
