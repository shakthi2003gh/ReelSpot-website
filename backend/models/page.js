const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    home: {
      discover: [
        {
          data: { type: mongoose.Types.ObjectId, refPath: "mediaType" },
          mediaType: {
            type: String,
            enum: ["Movie", "TvShow"],
            required: true,
          },
        },
      ],
      trending: [
        {
          data: { type: mongoose.Types.ObjectId, refPath: "mediaType" },
          mediaType: {
            type: String,
            enum: ["Movie", "TvShow"],
            required: true,
          },
        },
      ],
      movies: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      tvShows: [{ type: mongoose.Types.ObjectId, ref: "TvShow" }],
    },
    movies: {
      discover: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      trending: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      popular: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      top_rated: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
      upcoming: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
    },
    tvShows: {
      discover: [{ type: mongoose.Types.ObjectId, ref: "TvShow" }],
      trending: [{ type: mongoose.Types.ObjectId, ref: "TvShow" }],
      popular: [{ type: mongoose.Types.ObjectId, ref: "TvShow" }],
      top_rated: [{ type: mongoose.Types.ObjectId, ref: "TvShow" }],
    },
  },
  {
    timestamps: true,
  }
);

exports.Page = mongoose.model("Page", schema);
