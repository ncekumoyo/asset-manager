import React, { MouseEventHandler } from "react";

type Button = {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ label, type, className, onClick }: Button) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-2 font-bold rounded-md w-[200px] ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
