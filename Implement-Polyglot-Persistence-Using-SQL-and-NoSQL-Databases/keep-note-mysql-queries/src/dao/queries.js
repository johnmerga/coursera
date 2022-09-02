const db = require("./connect_db");
const generateUsers = require("./user.queries");

/* Deleting the users table. */
// db.query("DELETE FROM users", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Users table deleted");
//   }
// });

const insertEntries = (table, entriesArray) => {
  let query = `INSERT INTO ${table} (`;
  for (let key in entriesArray[0]) {
    query += `${key},`;
  }
  query = query.slice(0, -1);
  query += `) VALUES (`;
  for (let i = 0; i < entriesArray.length; i++) {
    let entriesValue = Object.values(entriesArray[i]);
    for (let key of entriesValue) {
      query += `'${key}',`;
    }
    query = query.slice(0, -1);
    query += `),(`;
  }

  query = query.slice(0, -1);

  query = query.slice(0, -2);
  query += `)`;
  return query;
};
// const fiftyUsersQuery = insertEntries("users", generateUsers(51));

// db.query(fiftyUsersQuery, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Users added to the database");
//   }
// });
module.exports = {
  insertEntriesu
};

