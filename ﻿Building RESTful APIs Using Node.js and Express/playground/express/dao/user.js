const { json } = require("express");
const fs = require("fs");

const getUsers = (done) => {
  fs.readFile("./data/users.json", "utf8", (err, data) => {
    if (err) {
      done("Error reading users file", null);
    } else {
      done(null, JSON.parse(data));
    }
  });
};
const getUserById = (id, done) => {
  fs.readFile("./data/users.json", "utf8", (err, data) => {
    if (err) {
      done("Error reading users file", null);
    } else {
      const users = JSON.parse(data);
      const user = users.find((user) => user.id === +id);
      done(null, JSON.stringify(user));
    }
  });
};

getUserById(6, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

module.exports = {
  getUsers,
  getUserById,
};
