import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-pastel-blue">
          <svg
            className="w-24 h-24 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for can't be found.
        </p>

        <Link to="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
