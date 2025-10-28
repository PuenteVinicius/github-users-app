import React from "react";

export const Button = ({ children, onClick, disabled }) => {
  return (
    <button className="" onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  );
};
