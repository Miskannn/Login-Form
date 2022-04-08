import React from "react";
import { GlobeAltIcon, LogoutIcon } from "@heroicons/react/outline";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between pt-2 pb-4 sm:py-4 bg-gray-10 w-full">
        <a className="ml-6 pt-1" href="#">
          <GlobeAltIcon className="h-6 w-6 text-gray-50" />
        </a>
        <Link href="/new-user">
          <a className="mr-5 sm:mr-7">
            <span className="text-xs sm:text-sm text-gray-50 lg:text-xl">
              New user
            </span>
            <LogoutIcon className="h-5 w-5 sm:h-6 inline sm:w-6 lg:h-7 lg:w-7 rotate-180 stroke-gray-50" />
          </a>
        </Link>
      </div>
    </footer>
  );
};
