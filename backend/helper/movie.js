const { Movie } = require("../models/movie");
const { getImgUrl, getVideo, fetchData } = require("./common");
const { getCachedDataId, searchData } = require("./common");
const { transformCast } = require("./actor");
const { getGenreIds } = require("./genre");

async function transform(data) {
  const { id, title, tagline, overview, genres, status, videos } = data;
  const { poster_path, backdrop_path, runtime, release_date } = data;
  const { original_language, credits } = data;

  const genresIds = await getGenreIds(genres);
  const promises = credits.cast.map(transformCast);
  const casts = await Promise.all(promises);

  return {
    tmdb_id: id,
    poster: getImgUrl(poster_path),
    title,
    tagline,
    overview,
    banner: getImgUrl(backdrop_path),
    genres: genresIds,
    status,
    video: getVideo(videos.results),
    runtime,
    release_date,
    language: original_language,
    casts,
  };
}

async function fetchMovie(tmdb_id) {
  const endpoint = `/movie/${tmdb_id}?append_to_response=credits%2Cvideos`;

  return fetchData(endpoint, Movie, transform)(tmdb_id);
}

module.exports = {
  fetchMovie,
  searchMovie: searchData(Movie, fetchMovie),
  getCachedMovieId: getCachedDataId(Movie, fetchMovie),
};
