const { Movie } = require("../models/movie");
const { getImgUrl, getVideoUrl, fetchData } = require("./common");
const { getCachedDataId, searchData } = require("./common");
const { getGenreIds } = require("./genre");

async function transform(data) {
  const { id, title, tagline, overview, genres, status, videos } = data;
  const { poster_path, backdrop_path, runtime, release_date } = data;
  const { original_language } = data;

  const genresIds = await getGenreIds(genres);

  return {
    tmdb_id: id,
    poster: getImgUrl(poster_path),
    title,
    tagline,
    overview,
    banner: getImgUrl(backdrop_path),
    genres: genresIds,
    status,
    video: getVideoUrl(videos.results),
    runtime,
    release_date,
    language: original_language,
  };
}

async function fetchMovie(tmdb_id) {
  const endpoint = `/movie/${tmdb_id}?append_to_response=videos`;

  return fetchData(endpoint, Movie, transform)(tmdb_id);
}

module.exports = {
  fetchMovie,
  searchMovie: searchData(Movie, fetchMovie),
  getCachedMovieId: getCachedDataId(Movie, fetchMovie),
};
