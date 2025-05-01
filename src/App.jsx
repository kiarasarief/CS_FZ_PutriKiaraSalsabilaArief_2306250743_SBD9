import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ItemManagement from "./pages/ItemManagement";
import StoreManagement from "./pages/StoreManagement";
import TransactionHistory from "./pages/TransactionHistory";
import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/AuthContext";
import api from "./services/api";

function App() {
  const { isAuthenticated } = useAuth();

  const [serverStatus, setServerStatus] = useState(null);

  const checkServerStatus = async () => {
    try {
      const response = await api.get("/");
      setServerStatus(response.data);
      console.log("Server status:", response.data);
    } catch (error) {
      console.error("Failed to connect to server:", error);
      setServerStatus({ status: "error", message: "Cannot connect to server" });
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<Products />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="items"
          element={
            <ProtectedRoute>
              <ItemManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="stores"
          element={
            <ProtectedRoute>
              <StoreManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactions"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
