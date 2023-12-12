const express = require("express");
const { fetchCategoryData } = require("../helper/categories");

const router = express.Router();

const controller = (path) => async (req, res) => {
  const page = req.query.page || 1;
  const endpoint = path.includes("page=") ? path + page : path;
  const data = await fetchCategoryData(endpoint);

  res.send(data);
};

router.get("/discover/movies", controller("/discover/movie?page="));
router.get("/trending/movies", controller("/trending/movie/day"));
router.get("/popular/movies", controller("/movie/popular?page="));
router.get("/top_rated/movies", controller("/movie/top_rated?page="));
router.get("/upcoming/movies", controller("/movie/upcoming?page="));

router.get("/discover/tvshows", controller("/discover/tv?page="));
router.get("/trending/tvshows", controller("/trending/tv/day"));
router.get("/popular/tvshows", controller("/tv/popular?page="));
router.get("/top_rated/tvshows", controller("/tv/top_rated?page="));

exports.categories = router;
