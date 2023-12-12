const { isValidObjectId } = require("mongoose");

exports.validateObjectId = function (req, res, next) {
  const ids = Object.keys(req.params).filter((key) => key.includes("_id"));
  const isValidIds = ids.every((id) => {
    if (isValidObjectId(req.params[id])) return true;
    if (isNaN(req.params[id])) return false;

    req.tmdb_ids = req?.tmdb_ids || {};
    req.tmdb_ids[id] = req.params[id];
    req.params[id] = false;

    return true;
  });

  if (!isValidIds) return res.status(400).send("Invalid id");
  next();
};
