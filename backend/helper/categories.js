const { Provider: http } = require("../http/provider");
const { fetchMovie, getCachedMovieId } = require("./movie");
const { fetchTvShow, getCachedTvShowId } = require("./tvshow");

function fetchCategoryData(endpoint) {
  const fetch = endpoint.includes("movie") ? fetchMovie : fetchTvShow;

  return new Promise(async (resolve) => {
    http(endpoint)
      .then(async ({ data }) => {
        const promises = data.results.map(({ id }) => fetch(id));
        const results = await Promise.all(promises);

        resolve(results.filter((data) => data));
      })
      .catch(async () => {
        const data = await fetchCategoryData(endpoint);
        resolve(data);
      });
  });
}

function populateCategoriesIds(categories) {
  const categoryData = {};

  return new Promise(async (resolve) => {
    const promises = Object.keys(categories).map((category) => {
      const endpoint = categories[category];
      const getCachedId = endpoint.includes("movie")
        ? getCachedMovieId
        : getCachedTvShowId;

      return new Promise(async (resolve) => {
        const { data } = await http(endpoint);
        const promises = data.results.map(({ id }) => getCachedId(id));
        const results = await Promise.all(promises);

        categoryData[category] = results;
        resolve();
      });
    });

    await Promise.all(promises);
    resolve(categoryData);
  });
}

module.exports = { fetchCategoryData, populateCategoriesIds };
