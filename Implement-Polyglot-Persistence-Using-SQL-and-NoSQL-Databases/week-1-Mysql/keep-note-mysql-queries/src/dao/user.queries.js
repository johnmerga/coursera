// generate 50 random users and insert them into the database
const db = require("./connect_db");
const generateUsers = (num) => {
  let users = [];
  for (let i = 0; i < num; i++) {
    let user = {
      username: `user${i}`,
      // random string of length 10
      user_password: Math.random().toString(36).substring(2, 12),
      // random mobile phone number of length 7
      user_mobile: Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(10, "09"),
    };
    users.push(user);
  }
  return users;
};

const user_id_fetcher = (callback) => {
  let user_id = [];
  db.query("SELECT user_id FROM users", (err, results) => {
    if (err) {
      callback("error occurred while fetching user_id");
    } else {
      user_id = results.map((user) => user.user_id);
      callback(null, user_id);
    }
  });
};

module.exports = {
  user_id_fetcher,
  generateUsers,
};
