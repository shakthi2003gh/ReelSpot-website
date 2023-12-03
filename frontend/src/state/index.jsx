import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "./../hooks/useMediaQuery";

const THEME_VAR_NAME = import.meta.env.VITE_THEME;
const InitialTheme = localStorage.getItem(THEME_VAR_NAME) || "light";
document.body.setAttribute("theme", InitialTheme);

const StateContext = createContext(null);

export function useFetch(fn) {
  const { state } = useContext(StateContext);

  return fn(state);
}

export function useController() {
  const { controller } = useContext(StateContext);

  return controller;
}

export default function StateProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(InitialTheme);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isTabletDevice = useMediaQuery(500);
  const isDesktopDevice = useMediaQuery(1000);

  const navigate = useNavigate();

  useEffect(() => {
    if (isDesktopDevice && !isMenuOpen) setMenuOpen(true);
    if (isTabletDevice && isMenuOpen) setMenuOpen(false);
  }, [isTabletDevice, isDesktopDevice]);

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

  const loginUser = (payload) => {
    setUser(payload);

    navigate("/");
  };

  const signupUser = (payload) => {
    setUser(payload);

    navigate("/");
  };

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const state = {
    user,
    ui: {
      theme,
      oppositeTheme,
      isMenuOpen,
    },
    mediaQuery: {
      isMobile: !isTabletDevice,
      isTablet: isTabletDevice,
      isDesktop: isDesktopDevice,
    },
  };

  const controller = {
    toggleTheme,
    toggleMenuOpen,
    loginUser,
    signupUser,
  };

  return (
    <StateContext.Provider value={{ state, controller }}>
      {children}
    </StateContext.Provider>
  );
}
