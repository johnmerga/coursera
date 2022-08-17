const router = require("express").Router();
const authController = require("./authController");

const config = require("../config");

router.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.GITHUB_CLIENT_ID}`
  );
});

router.get("/callback", (req, res) => {
  try {
    authController.oauthProcessor(req.query.code, (err, token) => {
      if (err) {
        console.log(req.query.code);

        res.status(401).json({
          status: "error",
          message: "Bad request",
        });
      } else {
        res.redirect(`/welcome.html?token=${token}`);
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error authenticating with GitHub",
    });
  }
});

module.exports = router;
