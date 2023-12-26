const express = require("express");
const { Page } = require("../models/page");
const { User } = require("../models/user");
const { TvShow } = require("../models/tvShow");
const { auth } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validateObjectId");
const { getPageID } = require("../helper/page");
const { searchTvShow, fetchTvShowSeasonsData } = require("../helper/tvshow");

const router = express.Router();

router.get("/", async (_, res) => {
  const page = await Page.findById(await getPageID())
    .populate({
      path: "tvShows",
      populate: [
        { path: "trending", limit: 13 },
        { path: "discover popular top_rated", limit: 10 },
      ],
    })
    .select("tvShows");

  res.send(page.tvShows);
});

router.get("/:tvshow_id", validateObjectId, async (req, res) => {
  const id = req.params.tvshow_id;
  const tmdb_id = req.tmdb_ids?.tvshow_id;

  const tvShow = id ? await TvShow.findById(id) : await searchTvShow(tmdb_id);
  if (!tvShow) return res.status(404).send("TvShow not found");

  res.send(tvShow);
});

router.get("/:tvshow_id/casts", validateObjectId, async (req, res) => {
  const id = req.params.tvshow_id;
  const tmdb_id = req.tmdb_ids?.tvshow_id;

  const tvShow = id ? await TvShow.findById(id) : await searchTvShow(tmdb_id);
  if (!tvShow) return res.status(404).send("TvShow not found");

  res.send(tvShow.casts);
});

router.get("/:tvshow_id/seasons", validateObjectId, async (req, res) => {
  const id = req.params.tvshow_id;
  const tmdb_id = req.tmdb_ids?.tvshow_id;

  const tvShow = id ? await TvShow.findById(id) : await searchTvShow(tmdb_id);
  if (!tvShow) return res.status(404).send("TvShow not found");

  if (!!tvShow.seasons?.length) return res.send(tvShow.seasons);

  const { tmdb_id: _id, total_seasons } = tvShow;
  const seasons = await fetchTvShowSeasonsData(_id, total_seasons);
  if (!seasons.every((data) => !!data))
    return res.status(404).send("Seasons not found");

  const args = [tvShow._id, { seasons }, { new: true }];
  const tvshow = await TvShow.findByIdAndUpdate(...args);

  res.send(tvshow.seasons);
});

const favoriteArgs = [validateObjectId, auth];
router.post("/:tvshow_id/favorite", ...favoriteArgs, async (req, res) => {
  const id = req.params.tvshow_id;
  const tmdb_id = req.tmdb_ids?.tvshow_id;
  const mediaType = "tvshow";

  const tvShow = id ? await TvShow.findById(id) : await searchTvShow(tmdb_id);
  if (!tvShow) return res.status(404).send("Tvshow not found");

  const isAlreadyFavorite = req.user.favorites?.some((data) => {
    return data.id === tvShow._id && data.mediaType === mediaType;
  });
  if (isAlreadyFavorite)
    return res.status(409).send("Tvshow with given id already in favorites");

  const data = { id: tvShow._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $push: { favorites: data } });

  res.send(data);
});

router.delete("/:tvshow_id/unfavorite", ...favoriteArgs, async (req, res) => {
  const id = req.params.tvshow_id;
  const tmdb_id = req.tmdb_ids?.tvshow_id;
  const mediaType = "tvshow";

  const tvShow = id ? await TvShow.findById(id) : await searchTvShow(tmdb_id);
  if (!tvShow) return res.status(404).send("Tvshow not found");

  const isNotFavorite = req.user.favorites?.every((data) => {
    return data.id !== tvShow._id && data.mediaType !== mediaType;
  });
  if (isNotFavorite)
    return res
      .status(200)
      .send("Tvshow with given id already not in favorites");

  const data = { id: tvShow._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: data } });

  res.send(data);
});

exports.tvShows = router;
