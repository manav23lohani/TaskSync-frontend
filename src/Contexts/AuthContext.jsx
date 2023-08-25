// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

  const handleLogin = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
