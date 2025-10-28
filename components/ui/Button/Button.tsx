import React from "react";

export const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-stone-950 hover:bg-stone-800 focus:ring-gray-700 border-neutral-50 cursor-pointer"
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
