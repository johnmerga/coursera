const router = require("express").Router();

const authMiddleware = require("../authentication/authMiddleware");
const userController = require("./userController");

router.get("/", (req, res) => {
  try {
    const userData = req.claims;
    if (!userData.email) {
      return res.status(401).send({
        status: "error",
        message: "user email not available",
      });
    }
    userController.findUser(userData.email, (err, user) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: `user not found with ${userData.email} email`,
        });
      }
      res.send({
        status: "ok",
        data: userData,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "server error",
    });
  }
});

module.exports = router;
