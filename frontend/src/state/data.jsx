import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./user";
import { getGenres } from "../http/genre.services";
import { fetchMovie } from "../http/movie.services";
import { fetchTvshow, fetchTvshowSeasons } from "../http/tvshow.services";

export const DataContext = createContext(null);

export function useData(id, mediaType) {
  const media_types = ["movies", "tvshows"];
  if (!media_types.includes(mediaType)) return Error("Invalid media type");

  const user = getUser();
  const { movies, tvshows, genres } = useContext(DataContext);

  const state = { movies, tvshows };
  let data = state[mediaType]?.[id];
  if (!data) return null;

  const type = mediaType.replace("s", "");
  const favorite = user?.favorites?.some((data) => {
    return data.id === id && data.mediaType === type;
  });
  const watchlist = user?.watchlist?.some((data) => {
    return data.id === id && data.mediaType === type;
  });

  data = { ...data };
  data.genres = data.genres.map((id) => genres?.[id]?.name);
  data.favorite = favorite;
  data.watchlist = watchlist;
  return data;
}

export default function DataProvider({ children }) {
  const [movies, setMovies] = useState({});
  const [tvshows, setTvshows] = useState({});
  const [genres, setGenres] = useState({});
  const navigate = useNavigate();

  const checkMovieExist = async (id) => {
    const movie = movies[id];
    if (movie) return;

    fetchMovie(id).then((data) => {
      setMovies((prev) => ({ ...prev, [data._id]: data }));

      if (id !== data._id) navigate("/movies/" + data._id, { replace: true });
    });
  };

  const checkTvshowExist = async (id) => {
    const tvshow = tvshows[id];
    if (tvshow) return;

    fetchTvshow(id).then((data) => {
      setTvshows((prev) => ({ ...prev, [data._id]: data }));
      if (id !== data._id) navigate("/tvshows/" + data._id, { replace: true });
    });
  };

  const checkTvshowSeasonsExist = (id) => {
    const tvshow = tvshows[id];
    if (!!tvshow?.seasons?.length) return;

    fetchTvshowSeasons(id).then((seasons) => {
      setTvshows((prev) => ({ ...prev, [id]: { ...prev[id], seasons } }));
    });
  };

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const value = {
    movies,
    tvshows,
    genres,
    setMovies,
    setTvshows,
    checkMovieExist,
    checkTvshowExist,
    checkTvshowSeasonsExist,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
