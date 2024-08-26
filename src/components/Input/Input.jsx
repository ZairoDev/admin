import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Input = ({ className, isSearchIcon, onChange, placeholder }) => {
  return (
    <div
      className={` ${className}  `}
    >
      <input
        type="text"
        className="block w-full outline-none  border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
        placeholder={placeholder || "Search here.."}
        onChange={(e) => onChange(e)}
      />
      {isSearchIcon && <SearchIcon className=" mr-2 cursor-pointer" />}
    </div>
  );
};

export default Input;
