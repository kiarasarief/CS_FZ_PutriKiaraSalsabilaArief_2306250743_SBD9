import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-auto py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              PurrfectShop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your one-stop shop for all cat-related needs.
            </p>
            <div className="flex items-center space-x-2">
              <div className="text-pastel-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                putrikiaaara@gmail.com
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-pastel-blue dark:hover:text-pastel-blue transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-pastel-blue dark:hover:text-pastel-blue transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-pastel-blue dark:hover:text-pastel-blue transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 dark:text-gray-400 hover:text-pastel-blue dark:hover:text-pastel-blue transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              About
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              At PurrfectShop, we believe every purr tells a story of love,
              care, and good nutrition. That’s why we craft high-quality,
              nutritious cat food made with real ingredients — no fillers, no
              fluff, just goodness in every bite. Whether your feline friend is
              a curious kitten or a wise senior, we’ve got the perfect recipe to
              keep them healthy and happy. Because when your cat thrives, so do
              we.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} PurrfectShop. All rights reserved.</p>
          <p className="mt-2 text-sm">By Putri Kiara Salsabila Arief (Database Systems Module 9)</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
