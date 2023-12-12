const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tmdb_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

exports.Genre = mongoose.model("Genre", schema);
