const userDao = require("./userDAO");

//import dao layer
function findUser(email, done) {
  //call the userdao finduser method
  userDao.findUser(email, done);
}

function registerUser(userData, done) {
  //call the userdao registeruser method
  userDao.registerUser(userData, done);
}

module.exports = {
  findUser,
  registerUser,
};
