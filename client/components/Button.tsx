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
      className={`col-span-2 justify-self-end group-invalid:border
          group-invalid:border-gray-400 group-invalid:text-gray-400
          group-invalid:bg-transparent text-white bg-success-77
          rounded-full px-6 py-2 w-fit ${className}`}
    >
      {children}
    </button>
  );
};
