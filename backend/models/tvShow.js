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
  status: String,
  total_seasons: Number,
  total_episodes: Number,
  type: { type: String, default: "tvshow" },
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
  seasons: [
    {
      tmdb_id: { type: Number, required: true },
      season_number: Number,
      name: String,
      overview: String,
      episodes: [
        {
          tmdb_id: { type: Number, required: true },
          episode_number: Number,
          title: String,
          runtime: Number,
          image: String,
        },
      ],
    },
  ],
});

exports.TvShow = mongoose.model("TvShow", schema);
