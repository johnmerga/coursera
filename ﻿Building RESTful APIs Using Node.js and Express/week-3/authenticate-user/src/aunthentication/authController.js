const authService = require("./authService");
const userService = require("../Users/userService");

//import the userService and authService module

//This function will registerUser it will take two parameters
//first the userData second the callback
//call the userService finduser method and also the userService register method
function registerUser(userData, done) {
  userService.findUser(userData.email, (err, data) => {
    if (err) {
      return userService.registerUser(userData, done);
    } else {
      done("user already exist");
    }
  });
}

//This function will loginUser
//Use the method findUser of userService to first verify and if userfound than call
//the createToken method
function loginUser({ email, password }, done) {
  userService.findUser(email, (err, user) => {
    if (err) {
      done(err);
    } else {
      const isValid = authService.verifyUser({ email, password }, user);
      if (!isValid) return done("wrong username or password");
      const token = authService.createJWT({ email, password });
      done(null, token);
    }
  });
}




module.exports = {
  registerUser,
  loginUser,
};
