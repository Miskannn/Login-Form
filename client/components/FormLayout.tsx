import React from "react";

interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
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
