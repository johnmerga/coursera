const config = require("../../config");
//import jsonwebtoken and config file
const jwt = require("jsonwebtoken");

//This function will verify email and password and will return true and false

function verifyUser({ email, password }, userData) {
  if (userData === undefined) {
    return false;
  } else {
    if (email === userData.email && password === userData.password) 
        return true;
    return false;
  }
}

//This function will create JWT token and return the token
// use the method jwt.sign having two parameters payload and Auth_Secret
function createJWT(userData) {
  //create payload
  const token = jwt.sign(userData, config.AUTH_SECRET, {
    expiresIn: "7d",
  });

  return token;
}

module.exports = {
  verifyUser,
  createJWT,
};
