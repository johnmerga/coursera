const fs = require("fs");
const path = require("path");
const users = require("./users.json");

userDir = path.join(__dirname, "./users.json");

/**
 * FindUser takes an email and a callback function, and calls the callback with an error and a user
 * object if the user is found, or an error and null if the user is not found.
 * @param email - the email address of the user
 * @param done - a callback function that takes two parameters: error and user
 * @returns The user object
 */
const findUser = (email, done) => {
  const found = users.filter((user) => user.email === email);
  if (!found || found.length === 0) {
    return done("not found", null);
  } else {
    done(null, found[0]);
  }
};

/**
 * It takes an object with a name, email, and password, and adds it to the users array
 * @param done - This is a callback function that we'll call when we're done with the registration
 * process.
 */
const registerUser = ({ name, email, password }, done) => {
  users.push({
    name,
    email,
    password,
  });
  fs.writeFile(userDir, JSON.stringify(users), (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, "user created");
  });
};

module.exports = {
  registerUser,
  findUser,
};
