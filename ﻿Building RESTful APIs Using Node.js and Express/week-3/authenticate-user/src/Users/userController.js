const userService = require("./userService");

//import userService

function findUser(email, done) {
  //call userService findUser method and pass the parameters
  userService.findUser(email, done);
}

module.exports = {
  findUser,
};
