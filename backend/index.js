require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const { index } = require("./routes/index");
const { home } = require("./routes/home");
const { users } = require("./routes/users");
const { genres } = require("./routes/genres");
const { movies } = require("./routes/movies");
const { tvShows } = require("./routes/tvShows");
const error = require("./middleware/error");

const options = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connect to MongoDB...");

    app.listen(4000, "localhost", () => {
      console.log("Listening on port 4000...");
    });
  })
  .catch((e) => {
    console.log("Couldn't connect to database...");
    console.log(e);
  });

app.use(cors(options));
app.use(bodyParser.json());
app.use("/api/tvshows", tvShows);
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/users", users);
app.use("/api/home", home);
app.use("/api", index);
app.use(error);
