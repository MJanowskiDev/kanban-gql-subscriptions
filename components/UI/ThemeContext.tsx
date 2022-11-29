import { createContext, Dispatch, SetStateAction } from "react";
export type Themes = "dark" | "light";

export interface ThemeContextType {
  setMode?: Dispatch<SetStateAction<Themes>>;
  mode: Themes;
}
export const DarkModeContext = createContext<ThemeContextType>({
  mode: "light",
});
