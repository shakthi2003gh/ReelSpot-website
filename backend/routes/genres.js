const express = require("express");
const { Genre } = require("../models/genre");
const { validateObjectId } = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", async (_, res) => {
  const genres = await Genre.find();

  res.send(genres);
});

router.get("/:genre_id", validateObjectId, async (req, res) => {
  const id = req.params.genre_id;
  if (!id) return res.status(400).send("Invalid id");

  const genre = await Genre.findById(id);
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

exports.genres = router;
