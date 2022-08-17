const userService = require("../Users/userService");
const authService = require("./authService");

const registerUser = (userInfo, done) => {
  userService.findUser(userInfo.email, (err, data) => {
    if (err) {
      return userService.registerUser(userInfo, done);
    }
    done("user already exist");
  });
};

const loginUser = ({ email, password }, done) => {
  try {
    userService.findUser(email, (err, user) => {
      if (err) {
        return done("user not found");
      } else {
        if (email === user.email && password === user.password) {
          const payload = {
            name: user.name,
            email: user.email,
          };
          const token = authService.createJWT(payload);
          user.token = token;
          done(null, user);
        } else {
          done("please check your email or password correctly");
        }
      }
    });
  } catch (error) {
    done(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
