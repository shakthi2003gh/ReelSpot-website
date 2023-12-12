const express = require("express");
const { Page } = require("../models/page");
const { Movie } = require("../models/movie");
const { TvShow } = require("../models/tvShow");
const { getPageID } = require("../helper/page");

const router = express.Router();

async function populate({ data: id, mediaType }) {
  const Model = { Movie, TvShow };
  return await Model[mediaType].findById(id);
}

router.get("/", async (_, res) => {
  const page = await Page.findById(await getPageID())
    .populate({
      path: "home",
      populate: [
        {
          path: "discover",
          limit: 13,
        },
        {
          path: "trending movies tvShows",
          limit: 10,
        },
      ],
    })
    .select("home");

  const { movies, tvShows } = page.home;

  const discoverPromises = page.home.discover.map(populate);
  const trendingPromises = page.home.trending.map(populate);

  const discover = await Promise.all(discoverPromises);
  const trending = await Promise.all(trendingPromises);

  discover.sort(() => 0.5 - Math.random());
  trending.sort(() => 0.5 - Math.random());

  res.send({ discover, trending, movies, tvShows });
});

exports.home = router;
