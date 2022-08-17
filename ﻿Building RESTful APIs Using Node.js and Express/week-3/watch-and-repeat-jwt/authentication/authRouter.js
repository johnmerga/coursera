const router = require("express").Router();
const authController = require("./authController");

router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ status: "error", message: "Missing fields" });
    }
    const userData = {
      name,
      email,
      password,
    };
    authController.registerUser(userData, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send({
          status: "OK",
          message: data,
        });
      }
    });
  } catch (error) {
    res.status.apply(500).send({
      status: "error",
      message: "server error",
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).json({ status: "error", message: "Missing fields" });
    }
    const userData = {
      email,
      password,
    };
    authController.loginUser(userData, (err, data) => {
      if (err) {
        res.status(401).send({
          status: "error",
          message: err,
        });
      } else {
        res.status(200).send({
          status: "OK",
          data,
        });
      }
    });
  } catch (error) {
    res.status.apply(500).send({
      status: "error",
      message: "server error",
    });
  }
});

module.exports = router;
