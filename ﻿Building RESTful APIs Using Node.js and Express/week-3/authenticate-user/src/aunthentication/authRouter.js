//import the modules that are required
const router = require("express").Router();
const authController = require("../aunthentication/authController");

//This method post will register the use
router.post("/register", (req, res) => {
  //retrieve name, email and password from request body
  try {
    const { name, email, password } = req.body;
    if (name === undefined || email === undefined || password === undefined) {
      res.status(400).send("Please enter all the fields");
    } else {
      const userDetails = {
        name,
        email,
        password,
      };
      //calling authController registerUser method return the error msg or the result
      authController.registerUser(userDetails, (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server Error",
    });
  }
});

//This method post will login the user once they are registered
router.post("/login", (req, res) => {
  try {
    //retrieve email and password from req.body
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.status(400).send("Please enter all the fields");
    } else {
      const userDetails = {
        email,
        password,
      };

      //calling the authController login usermethod return the error or the result
      authController.loginUser(userDetails, (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server Error",
    });
  }
});

module.exports = router;
