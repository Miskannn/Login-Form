import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={clsx("h-16 w-16 mx-auto my-12 sm:h-20 sm:w-20 sm:my-10 lg:h-20 lg:w-20 lg:my-4", className)}
    >
      <Image src="/abler-logo.svg" alt="abler-logo" height={95} width={95} />
    </header>
  );
};
