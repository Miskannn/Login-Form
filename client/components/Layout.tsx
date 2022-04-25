import React from "react";
import clsx from "clsx";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div
      className={clsx("w-full min-h-full mx-auto grid grid-rows-[auto_1fr_auto] sm:w-3/5", className)}
    >
      {children}
    </div>
  );
};
