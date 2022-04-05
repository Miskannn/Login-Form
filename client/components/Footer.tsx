import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between pt-2 pb-4 sm:py-4 bg-gray-10 w-full">
        <a className="ml-6 pt-1" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </a>

        <a className="mr-5 sm:mr-7" href="#">
          <span className="text-xs sm:text-sm text-gray-50 lg:text-xl">
            New user
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 inline sm:w-6 lg:h-7 lg:w-7 rotate-180 stroke-gray-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};
