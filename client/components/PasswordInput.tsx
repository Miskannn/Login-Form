import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/outline";

interface PasswordInputProps {
  onChange: (e: any) => void;
  value: string;
  className: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  value,
  className= "",
  placeholder = "Password",
}) => {
  const [type, setType] = useState<"text" | "password">("password");

  return (
    <>
      <input
        type={type}
        required
        minLength={6}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={`
              col-span-full px-8 py-4 outline-none
              border-b-2 border-gray-300
              invalid:border-danger-66 valid:border-success-77
              placeholder-shown:invalid:border-gray-300 placeholder-shown:valid:border-gray-300
              placeholder-shown:focus:border-gray-800 focus:text-gray-800
              focus:placeholder:text-gray-800
              focus:font-medium ${className}`}
        placeholder={placeholder}
      />

      <LockClosedIcon
        className={`h-6 w-6 ml-1 ${className} col-start-1 peer-focus:text-gray-800`}
      />

      <LockOpenIcon
        className={`h-6 w-6 ml-1 ${className} col-start-1 peer-focus:text-gray-800`}
      />

      <EyeIcon
        onClick={() => setType("password")}
        data-icon="eye"
        className={`h-6 w-6 ${className} col-start-4 justify-self-end cursor-pointer`}
      />

      <EyeOffIcon
        onClick={() => setType("text")}
        data-icon="eye-off"
        className={`h-6 w-6 ${className} col-start-4 justify-self-end cursor-pointer`}
      />
    </>
  );
};
