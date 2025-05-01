import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { id, name, price, image_url, description, stock } = product;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="card group">
      <div className="relative h-60 overflow-hidden">
        <img
          src={
            image_url ||
            "https://images.pexels.com/photos/6957898/pexels-photo-6957898.jpeg"
          }
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Only {stock} left!
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-gray-800 dark:text-white">
            ${Number(price).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-pastel-blue hover:bg-dark-pastel-blue text-text-dark px-3 py-1.5 rounded transition-colors"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
