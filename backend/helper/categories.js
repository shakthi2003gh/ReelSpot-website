const { Provider: http } = require("../http/provider");
const { getCachedMovieId } = require("./movie");
const { getCachedTvShowId } = require("./tvshow");

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

module.exports = { populateCategoriesIds };
