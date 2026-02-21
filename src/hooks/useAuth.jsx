import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // ensure axios default header is set for subsequent requests
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.access_token);
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    // set default header for api
    api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    setUser(response.data.user);
    return response.data;
  };

  const signup = async (email, password, name, github_username) => {
    const response = await api.post("/auth/signup", {
      email,
      password,
      name,
      github_username,
    });
    localStorage.setItem("token", response.data.access_token);
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
