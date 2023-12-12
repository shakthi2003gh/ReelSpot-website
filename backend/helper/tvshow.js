const { TvShow } = require("../models/tvShow");
const { getImgUrl, getVideoUrl, fetchData } = require("./common");
const { searchData, getCachedDataId } = require("./common");
const { getGenreIds } = require("./genre");

async function transformTvShow(data) {
  const { id, name, tagline, overview, genres } = data;
  const { poster_path, backdrop_path, status, videos } = data;
  const { original_language } = data;

  const genresIds = await getGenreIds(genres);

  return {
    tmdb_id: id,
    poster: getImgUrl(poster_path),
    title: name,
    tagline,
    overview,
    banner: getImgUrl(backdrop_path),
    genres: genresIds,
    status,
    video: getVideoUrl(videos.results),
    language: original_language,
  };
}

async function fetchTvShow(tmdb_id) {
  const endpoint = `/tv/${tmdb_id}?append_to_response=videos`;

  return fetchData(endpoint, TvShow, transformTvShow)(tmdb_id);
}

module.exports = {
  fetchTvShow,
  searchTvShow: searchData(TvShow, fetchTvShow),
  getCachedTvShowId: getCachedDataId(TvShow, fetchTvShow),
};
