// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "8000",
  jsonServerPort: process.env.jsonServerPort || "3001",
};

module.exports = config;
