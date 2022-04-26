import React from "react";
import clsx from "clsx";

interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

export const FormLayout: React.FC<FormProps> = ({ children, onSubmit,className = "" }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx("group lg:w-[386px] grid grid-cols-[2rem_1fr_1fr_2rem] gap-4 items-center auto-rows-max text-gray-50", className)}
    >
      {children}
    </form>
  );
};
