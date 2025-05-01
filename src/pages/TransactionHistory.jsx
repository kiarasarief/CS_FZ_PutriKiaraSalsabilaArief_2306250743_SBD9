import { useState } from "react";

function TransactionHistory() {
  // Mock transaction data
  const [transactions, setTransactions] = useState([
    {
      id: "t1",
      date: "2025-04-10T14:32:00Z",
      total: 53.97,
      status: "completed",
      items: [
        { name: "Meow Mix Cat Food", quantity: 2, price: 15.99 },
        { name: "Cat Grooming Brush", quantity: 1, price: 9.99 },
        { name: "Cat Collar with Bell", quantity: 1, price: 7.99 },
      ],
    },
    {
      id: "t2",
      date: "2025-04-05T10:15:00Z",
      total: 34.99,
      status: "completed",
      items: [{ name: "Cat Scratching Post", quantity: 1, price: 34.99 }],
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven't made any transactions yet.
          </p>
          <a href="/products" className="btn-primary inline-block">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {transaction.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(transaction.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        ${transaction.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-pastel-blue hover:text-dark-pastel-blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransaction(transaction);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setSelectedTransaction(null)}
            ></div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-auto z-10 p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Order ID
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-white">
                      {selectedTransaction.id}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-white">
                      {formatDate(selectedTransaction.date)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </h3>
                    <p className="mt-1">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          selectedTransaction.status
                        )}`}
                      >
                        {selectedTransaction.status.charAt(0).toUpperCase() +
                          selectedTransaction.status.slice(1)}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-white font-semibold">
                      ${selectedTransaction.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Items
              </h3>

              <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
                {selectedTransaction.items.map((item, index) => (
                  <li key={index} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-800 dark:text-white font-medium">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
