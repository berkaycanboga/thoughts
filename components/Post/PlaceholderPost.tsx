import React from "react";

const LoadingPlaceholder = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center mb-2">
        <div className="flex">
          <div className="w-20 h-4 bg-gray-300 mb-2 mr-2"></div>
          <div className="w-20 h-4 bg-gray-300 mb-2 mr-2"></div>
          <div className="w-8 h-4 bg-gray-300 mb-2 mr-2"></div>
        </div>
      </div>
      <div className="w-full h-16 bg-gray-300 mb-2"></div>
    </div>
  );
};

export default LoadingPlaceholder;
