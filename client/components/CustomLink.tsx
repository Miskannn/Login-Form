import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface CustomLinkProps {
  className?: string;
  href: string;
  name: string;
  left?: boolean;
  right?: boolean;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  name,
  className= "",
  children,

  }) => {
  return (
    <Link href={`/${href}`}>
      <a className={clsx("opacity-60 hover:opacity-100 col-span-2 text-gray-500 pl-1 pr-1", className)}>
       <>
        {children}
        {name}
       </>
      </a>
    </Link>
  );
};
