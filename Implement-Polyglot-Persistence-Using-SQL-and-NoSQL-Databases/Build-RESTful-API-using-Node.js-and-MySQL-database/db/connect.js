const mysql = require("mysql");
const dbConfig = require("../config/db_config");

const connection = mysql.createConnection(dbConfig);
connection.connect((err, result) => {
  if (err) {
    console.log("cannot connect to mysql database");
    console.log(err)
  } else {
    console.log("successfully connected to MySql database");
  }
});

// const queryText = "SELECT * FROM student";

// connection.query(queryText, (err, data) => {
//   if (err) {
//     console.log("query ended with error");
//   } else {
//     console.table(data);
//   }
// });

module.exports = connection;
