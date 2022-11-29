import { ReactNode } from "react";
import { Header } from "./Header";

import { Theme } from "./Theme";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Theme>
      <div className="min-h-screen bg-gray-100/50 dark:bg-gray-900 dark:text-white  flex flex-col justify-between overflow-x-hidden">
        <div>
          <Header />
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-2  bg-gray-100/50 dark:bg-gray-900">
            {children}
          </div>
        </div>
      </div>
    </Theme>
  );
};
