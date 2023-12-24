import { getData } from "./common.services";

function extractor(movies, tvshows) {
  return function (data) {
    const obj = {};

    Object.keys(data).forEach((category) => {
      obj[category] = data[category].map((data) => {
        const { _id, tmdb_id } = data;

        if (data.type === "movie") movies[_id || tmdb_id] = data;
        if (data.type === "tvshow") tvshows[_id || tmdb_id] = data;

        return _id || tmdb_id;
      });
    });

    return obj;
  };
}

export function fetchPages() {
  return new Promise(async (resolve) => {
    const movies = {};
    const tvshows = {};
    const extract = extractor(movies, tvshows);

    const homeData = await getData("/home").then(extract);
    const moviesData = await getData("/movies").then(extract);
    const tvData = await getData("/tvshows").then(extract);

    resolve({
      page: { home: homeData, movies: moviesData, tv: tvData },
      data: { movies, tvshows },
    });
  });
}
