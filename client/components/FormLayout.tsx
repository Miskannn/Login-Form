import Link from "next/link";
import React, { ReactNode, ReactChild } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

interface FormProps {
  children: ReactNode | ReactChild;
}

export const FormLayout: React.FC<FormProps> = ({ children }) => {
  return (
    <form className="group grid grid-cols-[2rem_1fr_1fr_2rem] gap-4 items-center auto-rows-max text-gray-50">
      {children}
      <Link href="#">
        <a className="col-span-2 hover:text-gray-500">
          <ExclamationCircleIcon className="h-6 w-6 ml-1 inline-block" />
          Forgot password
        </a>
      </Link>
      <button
        className="
          col-span-2 justify-self-end group-invalid:border
          group-invalid:border-gray-400 group-invalid:text-gray-400
          group-invalid:bg-transparent text-white bg-success-77
          rounded-full px-6 py-2 w-fit"
      >
        Log in
      </button>
    </form>
  );
};
