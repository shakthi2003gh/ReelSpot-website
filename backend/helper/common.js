const { Provider: http } = require("../http/provider");

function cacheData(Model) {
  return async function (data) {
    const isDataExist = await Model.findOne({ tmdb_id: data.tmdb_id });
    if (isDataExist) return isDataExist;

    const cachedData = new Model(data);
    await cachedData.save();

    return cachedData;
  };
}

function fetchData(endpoint, Model, transform) {
  return async function (tmdb_id) {
    const isDataExist = await Model.findOne({ tmdb_id });
    if (isDataExist) return isDataExist;

    return new Promise(async (resolve) => {
      http(endpoint)
        .then(async ({ data }) => {
          const transformedData = await transform(data);
          resolve(transformedData);
        })
        .catch(() => resolve(null));
    });
  };
}

function searchData(Model, fetch) {
  return async function (tmdb_id) {
    const isDataExist = await Model.findOne({ tmdb_id });
    if (isDataExist) return isDataExist;

    const data = await fetch(tmdb_id);
    if (!data) return data;

    const cachedData = await cacheData(Model)(data);
    return cachedData;
  };
}

module.exports = { fetchData, searchData };
