const fs = require("fs");
const path = require("path");

//import users.json file and fs module
const users = require("./users.json");
userDir = path.join(__dirname, "./users.json");

//This method will findUser
function findUser(email, done) {
  //use filter method to find the user from json file
  const found = users.filter((user) => user.email === email);
  if (!found || found.length === 0) {
    return done("not found", null);
  } else {
    done(null, found[0]);
  }
}

//This method will register user
function registerUser(userData, done) {
  //call fileWrite method and write the user in json file
  const { name, email, password } = userData;
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
}

module.exports = {
  findUser,
  registerUser,
};
