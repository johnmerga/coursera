const axios = require("axios");
const { token } = require("morgan");
const config = require("../config");

const getGitHubAccessToken = (code, done) => {
  const url = `https://github.com/login/oauth/access_token?client_id=${config.GITHUB_CLIENT_ID}&client_secret=${config.GITHUB_CLIENT_SECRET}&code=${code}`;
  const body = {
    client_id: config.GITHUB_CLIENT_ID,
    client_secret: config.GITHUB_CLIENT_SECRET,
    code: code,
  };
  const opts = {
    Headers: {
      accept: "application/json",
    },
  };
  axios
    .post(url, opts)
    .then((response) => {
      console.log(response.data);
      return response.data.access_token;
    })
    .then((token) => done(null, token))
    .catch((err) => {
      done(err);
    });
};

getGitHubAccessToken("e6b03ba2a80b8d964297", (err, token) => {
  if (err) {
    console.log(err);
  } else {
    console.log(token);
  }
});

module.exports = { getGitHubAccessToken };
