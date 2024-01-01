const express = require("express");
const { Page } = require("../models/page");
const { User } = require("../models/user");
const { Movie } = require("../models/movie");
const { auth } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validateObjectId");
const { getPageID } = require("../helper/page");
const { cachedMovie } = require("../helper/movie");

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

router.use(auth);

router.get("/:movie_id", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

router.get("/:movie_id/casts", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie.casts);
});

router.post("/:movie_id/favorite", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;
  const mediaType = "movie";

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  const isAlreadyFavorite = req.user.favorites?.some((data) => {
    return data.id === movie._id && data.mediaType === mediaType;
  });
  if (isAlreadyFavorite)
    return res.status(409).send("Movie with given id already in favorites");

  const data = { id: movie._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $push: { favorites: data } });

  res.send(data);
});

router.delete("/:movie_id/unfavorite", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;
  const mediaType = "movie";

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  const isNotFavorite = req.user.favorites?.every((data) => {
    return data.id !== movie._id && data.mediaType !== mediaType;
  });
  if (isNotFavorite)
    return res.status(200).send("Movie with given id already not in favorites");

  const data = { id: movie._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: data } });

  res.send(data);
});

router.post("/:movie_id/watchlist", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;
  const mediaType = "movie";

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  const isAlreadyWatchlist = req.user.watchlist?.some((data) => {
    return data.id === movie._id && data.mediaType === mediaType;
  });
  if (isAlreadyWatchlist)
    return res.status(409).send("Movie with given id already in watchlist");

  const data = { id: movie._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $push: { watchlist: data } });

  res.send(data);
});

router.delete("/:movie_id/unwatchlist", validateObjectId, async (req, res) => {
  const id = req.params.movie_id;
  const tmdb_id = req.tmdb_ids?.movie_id;
  const mediaType = "movie";

  const movie = id ? await Movie.findById(id) : await cachedMovie(tmdb_id);
  if (!movie) return res.status(404).send("Movie not found");

  const isNotInWatchlist = req.user.watchlist?.every((data) => {
    return data.id !== movie._id && data.mediaType !== mediaType;
  });
  if (isNotInWatchlist)
    return res.status(200).send("Movie with given id already not in watchlist");

  const data = { id: movie._id, mediaType };
  await User.findByIdAndUpdate(req.user._id, { $pull: { watchlist: data } });

  res.send(data);
});

exports.movies = router;
