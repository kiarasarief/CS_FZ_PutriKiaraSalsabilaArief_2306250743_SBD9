import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  MoonIcon,
  SunIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const activeClassName =
    "text-dark-pastel-blue dark:text-pastel-blue font-medium";
  const inactiveClassName =
    "text-gray-700 dark:text-gray-300 hover:text-dark-pastel-blue dark:hover:text-pastel-blue";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    // Only show these if authenticated
    ...(isAuthenticated
      ? [
          { name: "My Profile", path: "/profile" },
          { name: "Items", path: "/items" },
          { name: "Stores", path: "/stores" },
          { name: "Transactions", path: "/transactions" },
        ]
      : []),
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-pastel-blue dark:text-pastel-blue text-2xl font-bold">
              Purrfect
              <span className="text-gray-700 dark:text-white">Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pastel-blue text-text-dark text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-dark-pastel-blue dark:hover:text-pastel-blue"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClassName : inactiveClassName
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-dark-pastel-blue text-white px-4 py-2 rounded-md font-medium"
                      : "bg-pastel-blue hover:bg-dark-pastel-blue text-text-dark px-4 py-2 rounded-md font-medium transition-colors"
                  }
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {isAuthenticated && (
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pastel-blue text-text-dark text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeClassName : inactiveClassName
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Auth Links */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-dark-pastel-blue dark:hover:text-pastel-blue"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? activeClassName : inactiveClassName
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-dark-pastel-blue text-white px-4 py-2 rounded-md font-medium"
                        : "bg-pastel-blue hover:bg-dark-pastel-blue text-text-dark px-4 py-2 rounded-md font-medium transition-colors"
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
