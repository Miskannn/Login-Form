import React from "react";
import Image from "next/image";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`mx-auto w-14 mt-10 my-12 sm:h-20 sm:w-20 sm:my-10 lg:h-24 lg:w-24 lg:my-16 ${className}`}
    >
      <Image src="/abler-logo.svg" alt="abler-logo" height={100} width={100} />
    </header>
  );
};
