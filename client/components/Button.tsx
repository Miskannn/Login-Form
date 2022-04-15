import React from "react";

interface ButtonProps {
  children: React.ReactChild | React.ReactNode;
  className?: string;
  clickHandler?: any;
  isError?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  clickHandler,
  isError,
  className= "",
  }) => {
  return (
    <button
      onClick={clickHandler}
      className={`col-span-2 justify-self-end group-invalid:border
          group-invalid:border-gray-400 group-invalid:text-gray-400
          group-invalid:bg-transparent text-white
          rounded-full px-6 py-2 w-fit ${
            isError ? "bg-danger-66" : "bg-success-77"
          } ${className}`}
    >
      {children}
    </button>
  );
};
