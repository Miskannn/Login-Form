import React, { ReactNode, ReactChild } from "react";

interface FormProps {
  children?: ReactNode | ReactChild;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormLayout: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="group grid grid-cols-[2rem_1fr_1fr_2rem] gap-4 items-center auto-rows-max text-gray-50"
    >
      {children}
    </form>
  );
};
