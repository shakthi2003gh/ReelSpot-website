import { Provider as http } from "./provider";

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

function fetchPage(path) {
  return new Promise(async (resolve) => {
    http
      .get(path)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

export function fetchPages() {
  return new Promise(async (resolve) => {
    const movies = {};
    const tvshows = {};
    const extract = extractor(movies, tvshows);

    const homeData = await fetchPage("/home").then(extract);
    const moviesData = await fetchPage("/movies").then(extract);
    const tvData = await fetchPage("/tvshows").then(extract);

    resolve({
      page: { home: homeData, movies: moviesData, tv: tvData },
      data: { movies, tvshows },
    });
  });
}
