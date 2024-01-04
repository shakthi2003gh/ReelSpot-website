const express = require("express");
const { searchData } = require("../helper/resource");

const router = express.Router();

router.get("/search", async (req, res) => {
  const { q, page } = req.query;

  if (page && !Number(page)) return res.status(400).send("Invalid page number");

  const data = await searchData(q, page);
  if (page) return res.send(data);

  res.send(data?.filter((_, i) => i < 5) || []);
});

exports.resource = router;
