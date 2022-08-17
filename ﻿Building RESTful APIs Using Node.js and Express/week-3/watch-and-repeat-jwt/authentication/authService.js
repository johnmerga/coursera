const { json } = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userDAO = require("../Users/userDAO");

const createJWT = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
};


module.exports = {
  createJWT,
  
};
