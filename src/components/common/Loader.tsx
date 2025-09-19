import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
    </div>
  );
}
