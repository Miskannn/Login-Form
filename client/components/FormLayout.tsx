import Link from "next/link";
import React, { ReactNode, ReactChild } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Button } from "./Button";

interface FormProps {
  children?: ReactNode | ReactChild;
  onSubmit?: (e: Event) => void;
  requestHandler?: any;
  userAuth?: boolean;
  registration?: boolean;
  error?: boolean;
}

export const FormLayout: React.FC<FormProps> = ({
  children,
  onSubmit,
  userAuth,
  registration,
  requestHandler,
  error,
}) => {
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="group grid grid-cols-[2rem_1fr_1fr_2rem] gap-4 items-center auto-rows-max text-gray-50"
    >
      {children}
      {userAuth ? (
        <>
          {!registration && (
            <Link href={"/forgot-password"}>
              <a className="col-span-2 hover:text-gray-500">
                <ExclamationCircleIcon className="h-6 w-6 ml-1 inline-block" />{" "}
                Forgot password
              </a>
            </Link>
          )}
          <Button clickHandler={requestHandler}>
            {registration ? "Register" : "Log in"}
          </Button>
        </>
      ) : (
        <Button>Get password</Button>
      )}
    </form>
  );
};
