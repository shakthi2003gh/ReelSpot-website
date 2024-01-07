import { getData } from "./common.services";

function extractor(movies, tvshows) {
  return function (data) {
    const obj = {};

    Object.keys(data).forEach((category) => {
      obj[category] = data[category].map((data) => {
        const { _id, tmdb_id, type } = data;

        if (type === "movie") movies[_id || tmdb_id] = data;
        if (type === "tvshow") tvshows[_id || tmdb_id] = data;

        return { id: _id || tmdb_id, mediaType: type };
      });
    });

    return obj;
  };
}

export function fetchPage(page) {
  const movies = {};
  const tvshows = {};
  const extract = extractor(movies, tvshows);

  return new Promise(async (resolve, reject) => {
    try {
      const data = await getData(`/${page}`).then(extract);
      resolve({ page: data, data: { movies, tvshows } });
    } catch (e) {
      reject(e);
    }
  });
}
