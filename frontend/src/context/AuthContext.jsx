import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../api/apiClient';

axios.defaults.withCredentials = true; // Send cookies by default

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


   const fetchUser = async () => {
  try {
    const res = await apiClient.get('/users/me');
   
    setUser(res.data.user);
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiClient.post('/users/logout');
    } catch { /* empty */ }
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
