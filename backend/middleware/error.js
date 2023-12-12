module.exports = (err, _, res, _next) => {
  res.status(500).send("Something went wrong in server");
  console.log(err);
};
