import React from "react";
import { GlobeAltIcon, LogoutIcon } from "@heroicons/react/outline";
import Link from "next/link";

interface FooterProps {
  name?: string;
  href?: string;
}

export const Footer: React.FC<FooterProps> = ({
  name = "New user",
  href = "new-user",
}) => {
  return (
    <footer className="flex-[0_0_auto] w-full bottom-0 fixed lg:sticky bg-gray-300 lg:bg-transparent lg:w-80 lg:mx-auto lg:mt-10 xl:w-96 2xl:w-[29.5rem]">
      <div className="flex justify-between pt-5 pb-6 sm:py-4 bg-gray-10 w-full">
        <a className="ml-6 pt-1" href="#">
          <GlobeAltIcon className="h-6 w-6 text-gray-50" />
        </a>
        <Link href={`/${href}`}>
          <a className="mr-5 sm:mr-7">
            <span className="text-xs sm:text-sm text-gray-50 lg:text-xl">
              {name}
            </span>
            <LogoutIcon className="h-5 w-5 sm:h-6 inline sm:w-6 lg:h-7 lg:w-7 rotate-180 stroke-gray-50" />
          </a>
        </Link>
      </div>
    </footer>
  );
};
