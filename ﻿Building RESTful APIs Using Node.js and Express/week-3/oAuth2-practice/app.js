const path = require("path");

const express = require("express");
const morgan = require("morgan");
const dateFormat = require("dateformat");

const oAuth = require("./oAuth");
const config = require("./config");

morgan.token("date", function getDate(req, res) {
  return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
});

const app = express();

app.use(
  morgan(":date :method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
app.use("/oauth", oAuth);

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
