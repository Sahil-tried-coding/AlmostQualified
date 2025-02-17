import React from "react";

const ShimmerLoader = () => {
  return (
    <div className="animate-pulse space-y-6 p-10">
      {/* Header */}
      <div className="h-8 bg-gray-300 rounded-md w-1/3"></div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded-md w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded-md w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
      </div>
    </div>
  );
};

export default ShimmerLoader;
