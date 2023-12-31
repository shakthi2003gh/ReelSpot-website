const { Provider: http } = require("../http/provider");

function getImgUrl(path) {
  if (!path) return null;
  return "https://image.tmdb.org/t/p/original" + path;
}

function getVideo(videos) {
  const video = videos.filter(({ site, type }) => {
    return site === "YouTube" && type === "Trailer";
  })[0];

  return video?.key || null;
}

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

function cachedData(Model, fetch) {
  return async function (tmdb_id) {
    const isDataExist = await Model.findOne({ tmdb_id });
    if (isDataExist) return isDataExist;

    const data = await fetch(tmdb_id);
    if (!data) return data;

    const cachedData = await cacheData(Model)(data);
    return cachedData;
  };
}

function getCachedDataId(Model, fetch) {
  return async function (tmdb_id) {
    const isDataExist = await Model.findOne({ tmdb_id });
    if (isDataExist) return isDataExist._id;

    const data = await fetch(tmdb_id);
    if (!data) return data;

    const cachedData = await cacheData(Model)(data);
    return cachedData._id;
  };
}

module.exports = {
  getImgUrl,
  getVideo,
  fetchData,
  cachedData,
  getCachedDataId,
};
