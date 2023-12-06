module.exports = (err, _, res, _next) => {
  res.status(500).send(err);
  console.log(err);
};
