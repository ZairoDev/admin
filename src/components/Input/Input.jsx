import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Input = ({ className, isSearchIcon }) => {
  return (
    <div
      className={` ${className} flex w-full justify-between items-center border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-transparent rounded-2xl text-sm font-normal h-11 border `}
    >
      <input
        type="text"
        className="border-none focus:border-none focus:outline-none bg-transparent w-full h-full rounded-3xl p-2"
        placeholder="Search here..."
      />
      {isSearchIcon && <SearchIcon className=" mr-2 cursor-pointer"/>}
    </div>
  );
};

export default Input;
