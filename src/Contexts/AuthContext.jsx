// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

  const handleLogin = (accessToken) => {
    // Perform login actions, e.g., store access token, set loggedIn to true
    localStorage.setItem('accessToken', accessToken);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., clear access token, set loggedIn to false
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
