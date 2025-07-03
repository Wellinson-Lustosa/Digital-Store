import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, getMyData } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('digitalStoreToken');
    if (token) {
      getMyData(token)
        .then((userData) => {
          setUser({ ...userData, token });
        })
        .catch(() => {
          localStorage.removeItem('digitalStoreToken');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('digitalStoreToken', data.token);
      setUser({ ...data });
      return true;
    } catch (error) {
      console.error('Falha no login:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await registerUser(userData);
      return true;
    } catch (error) {
      console.error('Falha no cadastro:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('digitalStoreToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
