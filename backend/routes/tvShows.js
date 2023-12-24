const express = require("express");
const { Page } = require("../models/page");
const { TvShow } = require("../models/tvShow");
const { validateObjectId } = require("../middleware/validateObjectId");
const { getPageID } = require("../helper/page");
const { searchTvShow } = require("../helper/tvshow");

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

exports.tvShows = router;
