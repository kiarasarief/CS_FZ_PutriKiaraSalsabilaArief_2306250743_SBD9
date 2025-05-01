import { createContext, useContext, useState, useEffect } from "react";
import { usersApi } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      const response = await usersApi.register({ name, email, password });
      const user = response.data.payload;

      setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "customer",
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await usersApi.login({ email, password });
      const user = response.data.payload;

      setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
