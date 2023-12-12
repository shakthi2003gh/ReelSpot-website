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
  languages: String,
  status: String,
});

exports.TvShow = mongoose.model("TvShow", schema);
