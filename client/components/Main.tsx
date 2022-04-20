import React from "react";
import clsx from "clsx";

interface MainLayoutProps {
  title: string;
  className?: string[];
}

export const Main: React.FC<MainLayoutProps> = ({
  children,
  title,
  className= [],
  ...props
}) => {
  return (
    <main
      {...props}
      className={clsx("max-w-full sm:max-w-sm md:max-w-md mx-auto mb-10", ...className)}
    >
      <h1 className="text-lg tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-4xl">
        {title}
      </h1>
      {children}
    </main>
  );
};
