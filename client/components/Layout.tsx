import React from "react";

interface LayoutProps {
  children: React.ReactNode | React.ReactChild;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full min-h-full h100 main mx-auto grid grid-rows-[auto_1fr_auto] sm:w-3/5 ${className}`}
    >
      {children}
    </div>
  );
};
