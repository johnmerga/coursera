const oauthService = require("./auth.service");

// Controller code which orchestrates the overall process
// It calls the service functions where the business logic is present
function oauthProcessor(code, done) {
  /**
   *
   * Get the access token for the logged in user
   *
   */
  oauthService.getGithubAccessToken(code, (error, accessToken) => {
    if (error) {
      done(error);
    } else {
      /**
       *
       * Get the user profile for the access token
       *
       */
      oauthService.getAccessTokenOfUser(accessToken, (error, userProfile) => {
        if (error) {
          done(error);
        } else {
          done(null, userProfile);
        }
      });
    }
  });
}

module.exports = {
  oauthProcessor,
};
