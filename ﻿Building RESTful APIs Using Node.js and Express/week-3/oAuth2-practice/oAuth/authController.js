const oauthService = require("./authService");

const oauthProcessor = (code, done) => {
  oauthService.getGitHubAccessToken(code, (err, token) => {
    if (err) {
      done(err);
    } else {
      done(null, token);
    }
  });
};

module.exports = { oauthProcessor };
