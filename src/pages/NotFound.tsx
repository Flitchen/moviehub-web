import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold text-primary-500 animate-pulse">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Oops! Page not found
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          replace
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
