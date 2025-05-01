import { createContext, useContext, useState, useEffect } from "react";
import { usersApi } from "../services/api";
import { handleApiError } from "../utils/apiUtils";

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
        role: user.role || "customer",
        token: user.token,
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.message || "Registration failed");
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
        token: user.token,
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed");
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await usersApi.update(userData);
      const updatedUser = response.data.payload;

      setCurrentUser((prev) => ({
        ...prev,
        ...updatedUser,
      }));

      // Update local storage
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...storedUser,
          ...updatedUser,
        })
      );

      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error);
      throw new Error(error.message || "Failed to update profile");
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
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
