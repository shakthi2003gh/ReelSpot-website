import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "./../hooks/useMediaQuery";
import { createUser, authUser, verifyUser } from "../http/user.services";
import { fetchPages } from "../http/page.services";
import { getGenres } from "./../http/genre.services";
import { favoriteMovie, fetchMovie } from "../http/movie.services";
import { fetchMoviesByCategory, unfavoriteMovie } from "../http/movie.services";
import { watchlistMovie, unwatchlistMovie } from "../http/movie.services";
import { favoriteTvshow, fetchTvshowSeasons } from "./../http/tvshow.services";
import { fetchTvshow, unFavoriteTvshow } from "./../http/tvshow.services";
import { watchlistTvshow, unWatchlistTvshow } from "./../http/tvshow.services";
import { fetchTvshowsByCategory } from "./../http/tvshow.services";

const TOKEN = import.meta.env.VITE_TOKEN;
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
  const [page, setPage] = useState(null);
  const [genres, setGenres] = useState({});
  const [movies, setMovies] = useState({});
  const [tvshows, setTvshows] = useState({});
  const [categories, setCategories] = useState({});
  const [theme, setTheme] = useState(InitialTheme);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isTabletDevice = useMediaQuery(500);
  const isDesktopDevice = useMediaQuery(1000);

  const navigate = useNavigate();

  useEffect(() => {
    getGenres().then(setGenres);

    fetchPages().then(({ page, data }) => {
      setPage(page);

      setMovies((prev) => ({ ...prev, ...data.movies }));
      setTvshows((prev) => ({ ...prev, ...data.tvshows }));
    });

    if (localStorage.getItem(TOKEN)) verifyUser().then(setUser);
  }, []);

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

  const loginUser = async (payload) => {
    return authUser(payload).then((data) => {
      setUser(data);
      navigate("/", { replace: true });
    });
  };

  const signupUser = async (payload) => {
    return createUser(payload).then((data) => {
      setUser(data);
      navigate("/", { replace: true });
    });
  };

  const checkMovieExist = async (id) => {
    const movie = movies[id];
    if (movie) return;

    fetchMovie(id).then((data) => {
      setMovies((prev) => ({ ...prev, [data._id]: data }));

      if (id !== data._id) navigate("/movies/" + data._id, { replace: true });
    });
  };

  const checkTvshowSeasonsExist = (id) => {
    const tvshow = tvshows[id];
    if (!!tvshow?.seasons?.length) return;

    fetchTvshowSeasons(id).then((seasons) => {
      setTvshows((prev) => ({ ...prev, [id]: { ...prev[id], seasons } }));
    });
  };

  const checkTvshowExist = async (id) => {
    const tvshow = tvshows[id];
    if (tvshow) return checkTvshowSeasonsExist(id);

    fetchTvshow(id).then((data) => {
      setTvshows((prev) => ({ ...prev, [data._id]: data }));
      if (id !== data._id) navigate("/tvshows/" + data._id, { replace: true });

      checkTvshowSeasonsExist(id);
    });
  };

  const checkCategory = async (media, category, page = 1) => {
    return new Promise((resolve) => {
      const setData = media === "movies" ? setMovies : setTvshows;
      const fetch =
        media === "movies" ? fetchMoviesByCategory : fetchTvshowsByCategory;

      fetch(category, page)
        .then((data) => {
          const obj = {};
          data.forEach((data) => {
            const { _id, tmdb_id } = data;
            obj[_id || tmdb_id] = data;
          });

          setData((prev) => ({ ...prev, ...obj }));
          setCategories((prev) => {
            const type = media.replace("s", "");
            const ids = Object.keys(obj).map((id) => ({ id, mediaType: type }));
            const data = (prev?.[media]?.[category] || []).concat(ids);

            const filterUniqueData = (data) =>
              data.filter((value, index, self) => {
                const i = self.findIndex((v) => {
                  return v.id === value.id && v.mediaType === value.mediaType;
                });

                return i === index;
              });

            return {
              ...prev,
              [media]: {
                ...prev?.[media],
                [category]: filterUniqueData(data),
              },
            };
          });
        })
        .finally(resolve);
    });
  };

  const addInFavorites = async (id, mediaType) => {
    const data = { id, mediaType };
    const fetch = mediaType === "movie" ? favoriteMovie : favoriteTvshow;

    setUser((prev) => ({ ...prev, favorites: [...prev.favorites, data] }));

    fetch(id).catch(() => {
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

    fetch(id).catch(() => {
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

  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const state = {
    user,
    page,
    categories,
    genres,
    movies,
    tvshows,
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
    checkMovieExist,
    checkTvshowExist,
    checkCategory,
    addInFavorites,
    removeFromFavorites,
    addInWatchlist,
    removeFromWatchlist,
  };

  return (
    <StateContext.Provider value={{ state, controller }}>
      {children}
    </StateContext.Provider>
  );
}
