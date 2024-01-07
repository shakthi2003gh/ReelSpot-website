import { useContext } from "react";
import UserProvider, { UserContext } from "./user";
import DataProvider, { DataContext } from "./data";
import PageProvider, { PageContext } from "./page";
import UIProvider, { UIContext } from "./ui";
import MediaQueryProvider, { MediaQueryContext } from "./mediaQuery";

export function useFetch(fn) {
  const mediaQuery = useContext(MediaQueryContext);
  const { theme, oppositeTheme, isMenuOpen } = useContext(UIContext) || {};

  const state = {
    mediaQuery,
    ui: { theme, oppositeTheme, isMenuOpen },
  };

  return fn(state);
}

export function useController() {
  const { loginUser, logoutUser, signupUser } = useContext(UserContext) || {};
  const { addInFavorites, removeFromFavorites } = useContext(UserContext) || {};
  const { addInWatchlist, removeFromWatchlist } = useContext(UserContext) || {};
  const { checkCategory, searchData } = useContext(PageContext) || {};
  const { checkMovieExist, checkTvshowExist } = useContext(DataContext) || {};
  const { checkTvshowSeasonsExist } = useContext(DataContext) || {};
  const { toggleTheme, toggleMenuOpen } = useContext(UIContext) || {};

  return {
    toggleTheme,
    toggleMenuOpen,
    loginUser,
    logoutUser,
    signupUser,
    checkMovieExist,
    checkTvshowExist,
    checkTvshowSeasonsExist,
    checkCategory,
    searchData,
    addInFavorites,
    removeFromFavorites,
    addInWatchlist,
    removeFromWatchlist,
  };
}

export default function StateProvider({ children }) {
  return (
    <UserProvider>
      <DataProvider>
        <UIProvider>
          <MediaQueryProvider>
            <PageProvider>{children}</PageProvider>
          </MediaQueryProvider>
        </UIProvider>
      </DataProvider>
    </UserProvider>
  );
}
