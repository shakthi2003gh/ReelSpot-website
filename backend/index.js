require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const { users } = require("./routes/users");
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
app.use("/api/users", users);
app.use(error);
