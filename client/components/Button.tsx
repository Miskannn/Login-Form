import React from "react";

interface ButtonProps {
  children: React.ReactChild | React.ReactNode;
  className?: string;
  clickHandler?: () => void;
  isError?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  clickHandler,
  isError,
}) => {
  return (
    <button
      className={`h-8 border bg-success-77 text-white rounded-full px-5 transition-all group-invalid:border group-invalid:border-gray-400 group-invalid:text-gray-400 group-invalid:bg-transparent hover:text-white hover:bg-success-77 ${className}`}
    >
      {children}
    </button>
  );
};
