

const express = require('express')

const config = require("./config");
const app = express();
const productsRouter = require("./src");

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  };

// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRouter);


const server = app.listen(config.PORT, () => {
  console.log('Listening on port', config.PORT);
});

module.exports = server;
