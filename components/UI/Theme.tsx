import { ReactNode, useState, useEffect } from "react";

interface ThemeProps {
  children: ReactNode;
}

import { DarkModeContext, Themes } from "./ThemeContext";

export const Theme = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<Themes>("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ mode: theme, setMode: setTheme }}>
      <div className={`${theme}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};
