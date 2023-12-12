const express = require("express");
const { Page } = require("../models/page");
const { getPageID } = require("../helper/page");
const { populateCategoriesIds } = require("../helper/categories");

const router = express.Router();
const movieCategories = {
  discover: "/discover/movie",
  trending: "/trending/movie/week",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};
const tvShowCategories = {
  discover: "/discover/tv",
  trending: "/trending/tv/week",
  popular: "/tv/popular",
  top_rated: "/tv/top_rated",
};

router.get("/", async (_, res) => {
  const page = await Page.findById(await getPageID());

  res.send(page);
});

router.get("/update-data", async (_, res) => {
  await Page.deleteMany();

  try {
    const home = {};
    const movies = await populateCategoriesIds(movieCategories);
    const tvShows = await populateCategoriesIds(tvShowCategories);

    const filterCategory = (category) => {
      const Movies = movies[category]
        .filter((_, i) => i < 7)
        .map((data) => ({ data, mediaType: "Movie" }));

      const TvShows = tvShows[category]
        .filter((_, i) => i < 6)
        .map((data) => ({ data, mediaType: "TvShow" }));

      return [...Movies, ...TvShows];
    };

    home.discover = filterCategory("discover");
    home.trending = filterCategory("trending");
    home.movies = movies.trending;
    home.tvShows = tvShows.trending;

    const page = new Page({ home, movies, tvShows });
    await page.save();

    res.send(page);
  } catch (er) {
    res.status(500).send("fetch error");
    console.log(er);
  }
});

exports.index = router;
