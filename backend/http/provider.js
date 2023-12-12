const axios = require("axios");

exports.Provider = axios.create({
  method: "get",
  baseURL: process.env.TMDB_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
  },
});
