import { getData } from "./common.services";

export function searchSuggestions(query) {
  return getData("/resource/search?q=" + query);
}

export function searchPage(query, page = 1) {
  if (query === "") return;
  const endpoint = `/resource/search?q=${query}&page=${page}`;

  const movies = {};
  const tvshows = {};

  return new Promise(async (resolve, reject) => {
    try {
      const ids = await getData(endpoint).then((res) =>
        res
          .filter((data) => !!data)
          .map((data) => {
            const { _id, tmdb_id, type } = data;

            if (type === "movie") movies[_id || tmdb_id] = data;
            if (type === "tvshow") tvshows[_id || tmdb_id] = data;

            return { id: _id || tmdb_id, mediaType: type };
          })
          .filter((d) => d.id && d.mediaType)
      );

      resolve({ ids, movies, tvshows });
    } catch (error) {
      reject(error);
    }
  });
}
