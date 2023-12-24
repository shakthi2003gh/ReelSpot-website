const express = require("express");
const { Page } = require("../models/page");
const { Movie } = require("../models/movie");
const { validateObjectId } = require("../middleware/validateObjectId");
const { getPageID } = require("../helper/page");
const { searchMovie } = require("../helper/movie");

const router = express.Router();

router.get("/", async (_, res) => {
  const page = await Page.findById(await getPageID())
    .populate({
      path: "movies",
      populate: [
        { path: "trending", limit: 13 },
        { path: "discover popular top_rated upcoming", limit: 10 },
      ],
    })
    .select("movies");

  res.send(page.movies);
});

router.get("/:movie_id", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;

  const movie = id ? await Movie.findById(id) : await searchMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

router.get("/:movie_id/casts", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;

  const movie = id ? await Movie.findById(id) : await searchMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie.casts);
});

exports.movies = router;
