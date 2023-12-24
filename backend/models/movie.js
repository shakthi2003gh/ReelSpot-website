const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true, unique: true },
  poster: String,
  video: String,
  banner: String,
  title: String,
  tagline: String,
  overview: String,
  genres: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Genre",
    },
  ],
  language: String,
  release_date: String,
  runtime: Number,
  status: String,
  type: { type: String, default: "movie" },
  casts: [
    {
      character: String,
      actor: {
        tmdb_id: { type: Number, required: true },
        image: String,
        name: String,
      },
    },
  ],
});

exports.Movie = mongoose.model("Movie", schema);
