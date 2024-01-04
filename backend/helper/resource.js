const { Provider: http } = require("../http/provider");
const { getImgUrl } = require("./common");
const { fetchMovie } = require("./movie");
const { fetchTvShow } = require("./tvshow");

async function searchTransform(data) {
  const { id, name, title } = data;
  const { poster_path, media_type } = data;
  const type =
    media_type === "movie"
      ? "movie"
      : media_type === "tv"
      ? "tvshow"
      : media_type;

  return {
    tmdb_id: id,
    title: media_type === "movie" ? title : name,
    poster: getImgUrl(poster_path),
    type,
  };
}

async function searchData(query, page) {
  const endpoint = new URL("https://example.com/search/multi");

  endpoint.searchParams.set("query", query);
  if (page) endpoint.searchParams.set("page", page);

  return new Promise(async (resolve) => {
    const { pathname, search } = endpoint;

    http(pathname + search)
      .then(async ({ data }) => {
        const filter = (d) => ["movie", "tv"].includes(d.media_type);

        const promises = data.results.filter(filter).map((data) => {
          return new Promise(async (resolve) => {
            if (!page) return resolve(searchTransform(data));

            const fetch =
              data.media_type === "movie" ? fetchMovie : fetchTvShow;

            const result = await fetch(data.id);

            resolve(result);
          });
        });

        const transformedData = await Promise.all(promises);
        resolve(transformedData);
      })
      .catch(() => resolve([]));
  });
}

module.exports = {
  searchData,
};
