import { createContext, useContext, useEffect, useState } from "react";
import { fetchPages } from "../http/page.services";
import { fetchMoviesByCategory } from "../http/movie.services";
import { fetchTvshowsByCategory } from "../http/tvshow.services";
import { DataContext } from "./data";

export const PageContext = createContext(null);

export function getPage() {
  const { home, movies, tvshows } = useContext(PageContext);
  return { home, movies, tvshows };
}

export function getCategoryPage(category, mediaType) {
  const { categories } = useContext(PageContext);
  return categories?.[mediaType]?.[category];
}

export default function PageProvider({ children }) {
  const [home, setHome] = useState(null);
  const [movies, setMovies] = useState(null);
  const [tvshows, setTvshows] = useState(null);
  const [categories, setCategories] = useState({});

  const { setMovies: Movies, setTvshows: Tvshows } = useContext(DataContext);

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

  useEffect(() => {
    fetchPages().then(({ page, data }) => {
      const { home, movies, tvshows } = page;

      setHome(home);
      setMovies(movies);
      setTvshows(tvshows);

      Movies((prev) => ({ ...prev, ...data.movies }));
      Tvshows((prev) => ({ ...prev, ...data.tvshows }));
    });
  }, []);

  const value = {
    home,
    movies,
    tvshows,
    categories,
    checkCategory,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}
