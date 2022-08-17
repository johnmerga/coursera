// module export
module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
};
