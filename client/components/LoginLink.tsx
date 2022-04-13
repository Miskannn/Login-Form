import Link from "next/link";
import React from "react";

interface LoginLinkProps {
  className?: string;
  [key: string]: any;
}

export const LoginLink: React.FC<LoginLinkProps> = ({
  className,
  ...props
}) => {
  return (
    <Link href={"/login"}>
      <a {...props} className={`col-span-2 hover:text-gray-500 ${className}`}>
        Login
      </a>
    </Link>
  );
};
