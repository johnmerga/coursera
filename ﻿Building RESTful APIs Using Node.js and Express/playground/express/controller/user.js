const userService = require("../service/user");

const getUsers = (done) => {
  userService.getUsers(done);
};
const getUserById = (id, done) => {
  userService.getUserById(id, done);
};

module.exports = {
  getUsers,
  getUserById,
};
