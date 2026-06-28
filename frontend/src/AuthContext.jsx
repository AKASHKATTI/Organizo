import React, { createContext, useState, useEffect, useContext } from "react";
import api from "./utils/api";
import { PROFILE } from "./utils/API_Paths";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get(PROFILE);
          setUser(res.data.user || res.data);
        } catch (error) {
          console.error("Failed to fetch user profile on load", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Using window.location to force a refresh and clear all state.
    window.location = "/signin";
  };

  const value = { user, setUser, loading, logout };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };