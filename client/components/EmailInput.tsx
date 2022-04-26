import React from "react";
import { CheckIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";

interface EmailInputProps {
  onChange?: (e: string) => void;
  value?: string;
  className?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ onChange, value,className }) => {
  return (
    <>
      <input
        type="email"
        name="email"
        required
        placeholder="Email address"
        className={clsx("peer row-start-1 col-span-full px-8 py-4 outline-none border-b-2 border-gray-200 invalid:border-danger-66 valid:border-success-77 placeholder-shown:invalid:border-gray-300 placeholder-shown:valid:border-gray-300 placeholder-shown:focus:border-gray-800 focus:text-gray-800 focus:placeholder:text-gray-800 focus:font-medium",
          className)}
        onChange={(e) => onChange?.(e.target?.value)}
        value={value}
      />

      <UserIcon className="h-6 w-6 my-5 row-start-1 col-start-1 ml-1 peer-focus:text-gray-800" />

      <CheckIcon className="h-6 w-6 row-start-1 col-start-4 justify-self-end text-success-77 invisible peer-valid:visible" />

      <XIcon className="h-6 w-6 row-start-1 col-start-4 justify-self-end text-danger-66 invisible peer-invalid:visible peer-placeholder-shown:peer-invalid:invisible" />
    </>
  );
};
