import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../contexts/ThemeContext";

function Layout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "dark" : "light"}`}
    >
      {/* Background stars */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 0.5 + 0.3}rem`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Header />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
