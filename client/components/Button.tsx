import React, { MouseEventHandler } from "react";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
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
      className={clsx("col-span-2 justify-self-end rounded-full text-white px-6 py-2 w-fit"
       ,{"bg-danger-66": isError , "bg-success-77 group-invalid:border group-invalid:border-gray-400 group-invalid:text-gray-400 group-invalid:bg-transparent":!isError }, className
      )}
    >
      {children}
    </button>
  );
};
