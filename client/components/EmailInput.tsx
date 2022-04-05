import React from "react";
import { CheckIcon, UserIcon, XIcon } from "@heroicons/react/outline";

interface EmailInputProps {
  onChange?: (e: any) => void;
  value?: string;
  isError?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  onChange,
  value,
  isError = null,
}) => {
  return (
    <>
      <input
        //style={isError ? { borderColor: "red" } : {}}
        type="email"
        name="email"
        required
        placeholder="Email address"
        className="peer row-start-1 col-span-full px-8 py-4
            outline-none border-b-2 border-gray-200
            invalid:border-danger-66 valid:border-success-77
            placeholder-shown:invalid:border-gray-300
            placeholder-shown:valid:border-gray-300
            placeholder-shown:focus:border-gray-800
            focus:text-gray-800
            focus:placeholder:text-gray-800
            focus:font-medium"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />

      <UserIcon
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-icon="user"
        role="img"
        className="h-6 w-6 my-5 row-start-1 col-start-1 ml-1 peer-focus:text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </UserIcon>

      <CheckIcon
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-icon="check"
        role="img"
        className="h-6 w-6 row-start-1 col-start-4 justify-self-end text-success-77 invisible peer-valid:visible"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </CheckIcon>

      <XIcon
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-icon="x"
        role="img"
        className="h-6 w-6 row-start-1 col-start-4 justify-self-end text-danger-66 invisible peer-invalid:visible peer-placeholder-shown:peer-invalid:invisible"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </XIcon>
    </>
  );
};
