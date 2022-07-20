const userDao = require("../dao/user.js");

const getUsers = (done) => {
  userDao.getUsers(done);
};

const getUserById = (id, done) => {
  userDao.getUserById(id, done);
};

module.exports = {
  getUsers,
  getUserById,
};
