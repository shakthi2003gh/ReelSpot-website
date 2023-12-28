import { createContext, useContext, useEffect } from "react";
import useMediaQuery from "./../hooks/useMediaQuery";
import { UIContext } from "./ui";

export const MediaQueryContext = createContext(null);

export default function MediaQueryProvider({ children }) {
  const isTabletDevice = useMediaQuery(500);
  const isDesktopDevice = useMediaQuery(1000);
  const { isMenuOpen, setMenuOpen } = useContext(UIContext);

  useEffect(() => {
    if (isDesktopDevice && !isMenuOpen) setMenuOpen(true);
    if (isTabletDevice && isMenuOpen) setMenuOpen(false);
  }, [isTabletDevice, isDesktopDevice]);

  const value = {
    isMobile: !isTabletDevice,
    isTablet: isTabletDevice,
    isDesktop: isDesktopDevice,
  };

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}
