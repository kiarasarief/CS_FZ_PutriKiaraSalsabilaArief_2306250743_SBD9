import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would update the user profile in the database
    // For this demo, we'll just show a success message
    setMessage({ text: "Profile updated successfully!", type: "success" });
    setIsEditing(false);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Account
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`mr-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "profile"
              ? "border-pastel-blue text-pastel-blue dark:text-pastel-blue"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`mr-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "orders"
              ? "border-pastel-blue text-pastel-blue dark:text-pastel-blue"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`py-2 border-b-2 font-medium transition-colors ${
            activeTab === "settings"
              ? "border-pastel-blue text-pastel-blue dark:text-pastel-blue"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Profile Information
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-pastel-blue hover:text-dark-pastel-blue font-medium"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                    required
                    disabled
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </h3>
                <p className="mt-1 text-gray-800 dark:text-white">
                  {currentUser?.name || "Not set"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </h3>
                <p className="mt-1 text-gray-800 dark:text-white">
                  {currentUser?.email}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </h3>
                <p className="mt-1 text-gray-800 dark:text-white capitalize">
                  {currentUser?.role || "Customer"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Created
                </h3>
                <p className="mt-1 text-gray-800 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Order History
          </h2>

          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't placed any orders yet.
            </p>
            <a href="/products" className="btn-primary inline-block">
              Start Shopping
            </a>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Account Settings
          </h2>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Email Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="order-updates"
                    type="checkbox"
                    className="h-4 w-4 text-pastel-blue border-gray-300 rounded focus:ring-pastel-blue"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="order-updates"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Order updates
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive emails about your order status
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="promotions"
                    type="checkbox"
                    className="h-4 w-4 text-pastel-blue border-gray-300 rounded focus:ring-pastel-blue"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="promotions"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Promotions and deals
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive emails about special offers and discounts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Account Actions
            </h3>

            <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
