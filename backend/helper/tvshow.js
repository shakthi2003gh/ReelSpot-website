const { Provider: http } = require("../http/provider");
const { TvShow } = require("../models/tvShow");
const { getImgUrl, getVideo, fetchData } = require("./common");
const { cachedData, getCachedDataId } = require("./common");
const { transformCast } = require("./actor");
const { getGenreIds } = require("./genre");

function transformEpisodes(data) {
  const { id, episode_number, name, runtime, still_path } = data;

  return {
    tmdb_id: id,
    episode_number,
    title: name,
    runtime,
    image: getImgUrl(still_path),
  };
}

function transformSeasons(data) {
  const { id, season_number, name, overview } = data;
  const episodes = data.episodes.map(transformEpisodes);

  return {
    tmdb_id: id,
    season_number,
    name,
    overview,
    episodes,
  };
}

async function transformTvShow(data) {
  const { id, name, tagline, overview, genres, credits } = data;
  const { poster_path, backdrop_path, status, videos } = data;
  const { original_language, number_of_seasons, number_of_episodes } = data;

  const genresIds = await getGenreIds(genres);
  const casts = await Promise.all(credits.cast.map(transformCast));

  return {
    tmdb_id: id,
    poster: getImgUrl(poster_path),
    title: name,
    tagline,
    overview,
    banner: getImgUrl(backdrop_path),
    genres: genresIds,
    status,
    video: getVideo(videos.results),
    language: original_language,
    total_seasons: number_of_seasons,
    total_episodes: number_of_episodes,
    type: "tvshow",
    casts,
  };
}

async function fetchTvShow(tmdb_id) {
  const endpoint = `/tv/${tmdb_id}?append_to_response=credits%2Cvideos`;

  return fetchData(endpoint, TvShow, transformTvShow)(tmdb_id);
}

async function fetchTvShowSeasonsData(tmdb_id, total_seasons) {
  const promises = [...Array(total_seasons)]
    .filter((_, i) => i < 10)
    .map((_, i) => {
      return new Promise((resolve) => {
        http(`/tv/${tmdb_id}/season/${i + 1}`)
          .then(({ data }) => transformSeasons(data))
          .then(resolve)
          .catch(() => resolve(null));
      });
    });

  return await Promise.all(promises);
}

module.exports = {
  fetchTvShow,
  fetchTvShowSeasonsData,
  cachedTvshow: cachedData(TvShow, fetchTvShow),
  getCachedTvShowId: getCachedDataId(TvShow, fetchTvShow),
};
