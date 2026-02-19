import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          
          {/* Icon */}
          <AlertTriangle className="w-16 h-16 text-error mb-4" />

          {/* Title */}
          <h2 className="text-2xl font-bold">Something went wrong</h2>

          {/* Message */}
          <p className="text-sm text-gray-500">
            Oops! Something unexpected happened. Please try again.
          </p>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} />
              Retry
            </button>

            <button
              className="btn btn-outline flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <Home size={18} />
              Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
