import React from "react";

const FormItem = ({ children, className = "", label, desc }) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <div className="mt-1">{children}</div>
      {desc && (
        <span className="block mt-3 ml-4 text-xs text-neutral-500 dark:text-neutral-400">
          {desc}
        </span>
      )}
    </div>
  );
};

export default FormItem;
