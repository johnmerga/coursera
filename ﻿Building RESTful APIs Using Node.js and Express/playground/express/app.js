const express = require("express");

const userRouter = require("./routes/user");
const config = require("./config");
const logger = require("./helper/logger");

const app = express();

app.use(logger);
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
