import { Link } from "react-router-dom";
import { products } from "../data/mockData";

function Home() {
  // Featured products (just take the first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden mb-16">
        <div className="bg-gradient-to-r from-pastel-blue to-dark-pastel-blue dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome to PurrfectShop
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Your one-stop destination for all things cats love. From premium
              food to cozy beds and fun toys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="btn-primary bg-white hover:bg-gray-100 text-pastel-blue font-semibold text-center"
              >
                Browse Products
              </Link>
              <Link
                to="/register"
                className="btn-secondary bg-transparent hover:bg-white/20 text-white border-white text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-28 h-28 md:w-36 md:h-36 opacity-20">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              fill="#FFFFFF"
              d="M47.7,-51.2C59.7,-34.8,66.3,-17.4,65.5,-0.8C64.7,15.8,56.4,31.7,44.3,44.5C32.1,57.3,16.1,67.2,-0.9,68.1C-17.9,69,-35.8,60.9,-48.8,48.2C-61.8,35.5,-69.9,17.8,-70.2,-0.3C-70.5,-18.4,-63,-36.7,-50,-52.4C-37,-68.1,-18.5,-81.1,-0.5,-80.6C17.5,-80.1,35,-67.5,47.7,-51.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose PurrfectShop?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're dedicated to providing the best products and service for you
            and your feline friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-pastel-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We carefully select every product to ensure the highest quality
              for your cats.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-pastel-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your cat supplies quickly with our efficient delivery service.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-pastel-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Expert Advice
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our team of cat lovers is always ready to help with any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-pastel-blue hover:text-dark-pastel-blue font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    to={`/products`}
                    className="text-sm text-pastel-blue hover:text-dark-pastel-blue"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="bg-cream dark:bg-gray-800 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Spoil Your Feline Friend?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join our community of cat lovers and get access to exclusive offers,
            early sales, and expert advice.
          </p>
          <Link to="/register" className="btn-primary inline-block">
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
