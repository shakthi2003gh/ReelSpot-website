const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const TOKEN = process.env.TOKEN;
const defaultNotSelect = "-password -createdAt -updatedAt -__v";

exports.auth = async function (req, res, next) {
  const token = req.header(TOKEN);
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const { _id } = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(_id).select(defaultNotSelect);
    if (!user) return res.status(401).send("Access denied. Invalid token");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token.", error });
  }
};
