import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser, createUser, verifyUser } from "./../http/user.services";
import { favoriteMovie, unfavoriteMovie } from "./../http/movie.services";
import { unwatchlistMovie, watchlistMovie } from "./../http/movie.services";
import { favoriteTvshow, unFavoriteTvshow } from "./../http/tvshow.services";
import { unWatchlistTvshow, watchlistTvshow } from "./../http/tvshow.services";

const TOKEN = import.meta.env.VITE_TOKEN;
const InitialValue = JSON.parse(sessionStorage.getItem("user"));

export const UserContext = createContext(null);

export function getUser() {
  const { user } = useContext(UserContext) || {};

  return user;
}

export function getAppLoading() {
  const { isLoading } = useContext(UserContext) || {};

  return isLoading;
}

export default function UserProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(InitialValue || null);
  const navigate = useNavigate();

  const loginUser = async (payload) => {
    return authUser(payload).then((data) => {
      setUser(data);
      navigate(-1, { replace: true });
    });
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(TOKEN);
    sessionStorage.removeItem("user");
  };

  const signupUser = async (payload) => {
    return createUser(payload).then((data) => {
      setUser(data);
      navigate(-1, { replace: true });
    });
  };

  const addInFavorites = async (id, mediaType) => {
    const data = { id, mediaType };
    const fetch = mediaType === "movie" ? favoriteMovie : favoriteTvshow;

    setUser((prev) => ({ ...prev, favorites: [...prev.favorites, data] }));

    fetch(id)
      .then((verifiedData) => {
        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((data) => {
            if (data.id === id && data.mediaType === mediaType)
              return verifiedData;
            return data;
          }),
        }));
      })
      .catch(() => {
        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((data) => {
            return !(data.id === id && data.mediaType === mediaType);
          }),
        }));
      });
  };

  const removeFromFavorites = async (id, mediaType) => {
    const data = { id, mediaType };
    const fetch = mediaType === "movie" ? unfavoriteMovie : unFavoriteTvshow;

    setUser((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((data) => {
        return !(data.id === id && data.mediaType === mediaType);
      }),
    }));

    fetch(id).catch(() => {
      setUser((prev) => ({ ...prev, favorites: [...prev.favorites, data] }));
    });
  };

  const addInWatchlist = async (id, mediaType) => {
    const data = { id, mediaType };
    const fetch = mediaType === "movie" ? watchlistMovie : watchlistTvshow;

    setUser((prev) => ({ ...prev, watchlist: [...prev.watchlist, data] }));

    fetch(id)
      .then((verifiedData) => {
        setUser((prev) => ({
          ...prev,
          watchlist: prev.watchlist.filter((data) => {
            if (data.id === id && data.mediaType === mediaType)
              return verifiedData;
            return data;
          }),
        }));
      })
      .catch(() => {
        setUser((prev) => ({
          ...prev,
          watchlist: prev.watchlist.filter((data) => {
            return !(data.id === id && data.mediaType === mediaType);
          }),
        }));
      });
  };

  const removeFromWatchlist = async (id, mediaType) => {
    const data = { id, mediaType };
    const fetch = mediaType === "movie" ? unwatchlistMovie : unWatchlistTvshow;

    setUser((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((data) => {
        return !(data.id === id && data.mediaType === mediaType);
      }),
    }));

    fetch(id).catch(() => {
      setUser((prev) => ({ ...prev, watchlist: [...prev.watchlist, data] }));
    });
  };

  useEffect(() => {
    if (!localStorage.getItem(TOKEN) || user) return setLoading(false);

    verifyUser()
      .then((data) => {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    user,
    isLoading,
    loginUser,
    logoutUser,
    signupUser,
    addInFavorites,
    addInWatchlist,
    removeFromFavorites,
    removeFromWatchlist,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
