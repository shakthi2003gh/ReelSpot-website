const Joi = require("joi");

function create(payload) {
  const schema = {
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required().min(3).max(30),
    password: Joi.string().required().min(3).max(50),
  };

  return Joi.object(schema).validate(payload);
}

function auth(payload) {
  const schema = {
    email: Joi.string().email().required().min(3).max(30),
    password: Joi.string().required().min(3).max(50),
  };

  return Joi.object(schema).validate(payload);
}

module.exports = { create, auth };
