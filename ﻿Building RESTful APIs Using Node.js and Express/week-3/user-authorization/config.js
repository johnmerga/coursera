// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "011b96656499a00ff868",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "afa74cce50b45ef4aa259998a8d1f136c7835476"  
}

module.exports = config;
