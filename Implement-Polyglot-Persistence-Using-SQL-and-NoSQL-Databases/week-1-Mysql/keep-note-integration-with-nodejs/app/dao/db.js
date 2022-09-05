const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

initializeConnection = () => {
  /* create a connection object using createConnection function of mysql module*/
  let connection = null;
  if (process.env.NODE_ENV === "production") {
    connection = mysql.createConnection({
      host: dbConfig.pro.HOST,
      user: dbConfig.pro.USER,
      password: dbConfig.pro.PASSWORD,
      database: dbConfig.pro.DB,
    });
  } else {
    connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB,
    });
  }
  connection.connect((err, res) => {
    if (err) {
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  return connection;
};


module.exports = initializeConnection;
