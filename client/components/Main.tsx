import React from "react";

interface MainLayoutProps {
  children: React.ReactNode | React.ReactChild;
  title: "Welcome" | "Oops" | "Wrong password";
}

export const Main: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <main className="max-w-full sm:max-w-sm md:max-w-md mx-auto mb-10">
      <h1 className="text-lg tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-5xl">
        {title}
      </h1>
      {children}
    </main>
  );
};
