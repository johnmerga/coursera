const axios = require("axios");
const config = require("../config");
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;

// function to get the access token
function getGithubAccessToken(code, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&code=${code}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;

    done(null, accessToken);
  });
}

// Function to get the user profile for the token provided
function getAccessTokenOfUser(token, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step
  axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((response) => {
      const userProfile = response.data;
      done(null, userProfile);
    })
    .catch((error) => {
      done(error);
    });
}

module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser,
};
