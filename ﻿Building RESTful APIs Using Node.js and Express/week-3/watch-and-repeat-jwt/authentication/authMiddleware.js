const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.claims = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};


module.exports = {
  verifyJWT,
};
