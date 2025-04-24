import React from 'react';
import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  // Check if it's a route error
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {is404 ? 'Page Not Found' : 'Oops! Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {is404
            ? "We couldn't find the page you're looking for."
            : "We're sorry, but we encountered an error while processing your request."}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
