const userDAO = require("./userDAO");

const findUser = (email, done) => {
  userDAO.findUser(email, done);
};
const registerUser = (userInfo, done) => {
  userDAO.registerUser(userInfo, done);
};


module.exports = {
  findUser,
  registerUser,
};

