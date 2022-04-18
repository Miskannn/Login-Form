import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface CustomLinkProps {
  className?: string[];
  href: string;
  name: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  name,
  className= [],
  }) => {
  return (
    <Link href={`/${href}`}>
      <a className={clsx(["col-span-2", "text-gray-500", "pl-1", "pr-1", ...className ])}>
        {name}
      </a>
    </Link>
  );
};
