import Link from "next/link";
import React from "react";

interface CustomLinkProps {
  className?: string;
  href: string;
  name: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  href,
  name,
}) => {
  return (
    <Link href={`/${href}`}>
      <a className={`col-span-2 text-gray-500 pl-1 pr-1 ${className}`}>
        {name}
      </a>
    </Link>
  );
};
