import { createContext, useState } from "react";

const THEME_VAR_NAME = import.meta.env.VITE_THEME;
const InitialTheme = localStorage.getItem(THEME_VAR_NAME) || "light";
document.body.setAttribute("theme", InitialTheme);

export const UIContext = createContext(null);

export default function UIProvider({ children }) {
  const [theme, setTheme] = useState(InitialTheme);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const theme = prevTheme === "dark" ? "light" : "dark";

      localStorage.setItem(THEME_VAR_NAME, theme);
      document.body.setAttribute("theme", theme);

      return theme;
    });
  };

  const toggleMenuOpen = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const value = {
    theme,
    oppositeTheme,
    isMenuOpen,
    setMenuOpen,
    toggleTheme,
    toggleMenuOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
