import React, { createContext, useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const checkTokenValidity = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired
        handleLogout();
      }
      else{
        setLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}