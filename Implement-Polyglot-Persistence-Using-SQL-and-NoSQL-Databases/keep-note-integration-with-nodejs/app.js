const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const config = require("./app/config/config.js");

const app = express();

var corsOptions = {
  origin: `http://localhost:${config.PORT}`,
};
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node.js with MySQL integration application.",
  });
});


require("./app/routes/category.routes.js")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/reminder.routes.js")(app);

// set port, listen for requests

var server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});

module.exports = server;
