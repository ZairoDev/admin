import React from "react";

const CardSkelton = () => {
  return (
    <div className="animate-pulse p-2 max-w-[300px] w-full mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-md">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2"></div>

      <div className="flex mb-2 gap-x-10 justify-between">
        <div className="h-6 w-full bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      </div>
      <div className="flex  gap-x-10 justify-between">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      </div>
      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-300 w-14 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 w-14 dark:bg-gray-600 rounded mb-2"></div>
      </div>
    </div>
  );
};

export default CardSkelton;
