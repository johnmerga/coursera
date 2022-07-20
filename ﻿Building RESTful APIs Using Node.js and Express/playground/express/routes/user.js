const route = require("express").Router();
const userController = require("../controller/user");

route.get("/", (req, res) => {
  userController.getUsers((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

route.get("/:id", (req, res) => {
  userController.getUserById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = route;
