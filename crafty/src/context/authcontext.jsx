import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUserId = localStorage.getItem('user_id');
    return storedUserId ? { id: storedUserId } : null;
  });

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', userData.id);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
