function cacheData(Model) {
  return async function (data) {
    const isDataExist = await Model.findOne({ tmdb_id: data.tmdb_id });
    if (isDataExist) return isDataExist;

    const cachedData = new Model(data);
    await cachedData.save();

    return cachedData;
  };
}
