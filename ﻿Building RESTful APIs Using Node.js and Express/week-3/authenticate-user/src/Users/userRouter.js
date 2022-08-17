//import the required module

const router = require("express").Router();

const authMiddleware = require("../aunthentication/authMiddleware");
const userController = require("./userController");

//This get method will get the user with token
router.get("/", (req, res) => {
  //retrieve userData from req claims
  const userData = req.claims;
  if (!userData) {
    res.status(401).send({
      status: "error",
      message: "unauthorized access",
    });
  } else {
    userController.findUser(userData.email, (err, data) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: `user not found with ${userData.email} email address`,
        });
      }
      res.send({
        status: "ok",
        data,
      });
    });
  }
});

module.exports = router;
