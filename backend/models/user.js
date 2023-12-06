const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 225,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [String],
    watchlist: [String],
  },
  {
    timestamps: true,
  }
);

schema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_KEY);
};

exports.User = mongoose.model("User", schema);
