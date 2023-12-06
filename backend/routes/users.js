const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");
const validator = require("../validators/user");

const router = express.Router();

const TOKEN = process.env.TOKEN;
const defaultNotSelect = "-password -createdAt -updatedAt -__v";

router.get("/me", auth, (req, res) => {
  res.send(req.user);
});

router.post("/auth", async (req, res) => {
  const { error, value } = validator.auth(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(401).send("Invalid email or password");

  const isValid = await bcrypt.compare(value.password, user.password);
  if (!isValid) return res.status(401).send("Invalid email or password");

  const token = user.generateAuthToken();
  const userData = await User.findById(user._id).select(defaultNotSelect);
  res.header(TOKEN, token).send(userData);
});

router.post("/new", async (req, res) => {
  const { error, value } = validator.create(req.body);
  if (error) return res.status(400).send(error.message);

  const isUserExist = await User.findOne({ email: value.email });
  if (isUserExist) return res.status(409).send("User already exist");

  const salt = await bcrypt.genSalt();
  value.password = await bcrypt.hash(value.password, salt);

  const user = new User(value);
  await user.save();

  const token = user.generateAuthToken();
  const userData = await User.findById(user._id).select(defaultNotSelect);
  res.header(TOKEN, token).status(201).send(userData);
});

router.delete("/me", auth, async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.sendStatus(204);
});

exports.users = router;
