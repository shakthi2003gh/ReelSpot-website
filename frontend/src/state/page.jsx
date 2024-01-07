import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "./data";
import { fetchPage } from "../http/page.services";
import { fetchMoviesByCategory } from "../http/movie.services";
import { fetchTvshowsByCategory } from "../http/tvshow.services";
import { searchPage } from "../http/resource.services";

const InitialHome = JSON.parse(sessionStorage.getItem("home-page"));
const InitialMovies = JSON.parse(sessionStorage.getItem("movies-page"));
const InitialTvshows = JSON.parse(sessionStorage.getItem("tvshows-page"));

export const PageContext = createContext(null);

export function getPage() {
  const { home, movies, tvshows } = useContext(PageContext) || {};
  return { home, movies, tvshows };
}

export function getCategoryPage(category, mediaType) {
  const { categories } = useContext(PageContext) || {};
  return categories?.[mediaType]?.[category];
}

export default function PageProvider({ children }) {
  const [home, setHome] = useState(InitialHome || null);
  const [movies, setMovies] = useState(InitialMovies || null);
  const [tvshows, setTvshows] = useState(InitialTvshows || null);
  const [categories, setCategories] = useState({});

  const data = useContext(DataContext) || {};
  const { setMovies: Movies, setTvshows: Tvshows } = data;

  const filterUniqueData = (data) =>
    data.filter((value, index, self) => {
      const i = self.findIndex((v) => {
        return v.id === value.id && v.mediaType === value.mediaType;
      });

      return i === index;
    });

  const checkCategory = async (media, category, page = 1) => {
    return new Promise((resolve) => {
      const setData = media === "movies" ? Movies : Tvshows;
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

  const searchData = async (query, page) => {
    return await searchPage(query, page).then(({ ids, movies, tvshows }) => {
      Movies((prev) => ({ ...prev, ...movies }));
      Tvshows((prev) => ({ ...prev, ...tvshows }));

      return ids;
    });
  };

  function get(name, dispatch) {
    const cacheData = (newData, name) => (prev) => {
      const data = { ...prev, ...newData };
      sessionStorage.setItem(name + "-data", JSON.stringify(data));

      return data;
    };

    fetchPage(name).then(({ page, data }) => {
      dispatch(page);
      sessionStorage.setItem(name + "-page", JSON.stringify(page));

      Movies(cacheData(data.movies, "movies"));
      Tvshows(cacheData(data.tvshows, "tvshows"));
    });
  }

  useEffect(() => {
    if (!home) get("home", setHome);
    if (!movies) get("movies", setMovies);
    if (!tvshows) get("tvshows", setTvshows);
  }, []);

  const value = {
    home,
    movies,
    tvshows,
    categories,
    checkCategory,
    searchData,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}
