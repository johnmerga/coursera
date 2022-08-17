const express = require("express");
const morgan = require("morgan");
const dateFormat = require("dateformat");

const config = require("./config");
const auth = require("./authentication/authRouter");
const authMiddleware = require('./authentication/authMiddleware')
const user = require("./Users/userRouter");

morgan.token("date", function getDate(req, res) {
  return dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
});

const app = express();

app.use(express.json());
app.use(
  morgan(
    "[:date] :method :url :status :res[content-length] - :response-time ms"
  )
);

app.use("/api/v1/auth", auth);
app.use("/api/v1/users",authMiddleware.verifyJWT, user);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
