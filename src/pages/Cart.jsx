import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();

      // Reset success message after a few seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
      }, 5000);
    }, 2000);
  };

  if (checkoutSuccess) {
    return (
      <div className="container mx-auto max-w-3xl">
        <div className="bg-green-100 dark:bg-green-900 p-8 rounded-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-green-500 dark:text-green-300">
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
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-green-700 dark:text-green-200 mb-6">
            Thank you for your purchase. Your order has been placed and will be
            processed soon.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/transactions" className="btn-secondary">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Your Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your shopping cart is empty
        </p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    {/* Product Image */}
                    <div className="w-full sm:w-20 h-20 flex-shrink-0 rounded overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow sm:ml-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <p className="font-semibold text-gray-800 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                        >
                          <TrashIcon className="h-5 w-5 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  $0.00
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  ${(getTotalPrice() * 0.1).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="font-bold text-xl text-gray-800 dark:text-white">
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-6 bg-pastel-blue hover:bg-dark-pastel-blue text-text-dark font-medium py-3 px-4 rounded transition-colors disabled:opacity-70"
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>

            <button
              onClick={() => clearCart()}
              className="w-full mt-4 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
