import React from "react";

interface MainLayoutProps {
  children: React.ReactNode | React.ReactChild;
  title: string;
  className?: string;
  [key: string]: any;
}

export const Main: React.FC<MainLayoutProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  return (
    <main
      {...props}
      className={`max-w-full sm:max-w-sm md:max-w-md mx-auto mb-10 ${className}`}
    >
      <h1 className="text-lg tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-5xl">
        {title}
      </h1>
      {children}
    </main>
  );
};
