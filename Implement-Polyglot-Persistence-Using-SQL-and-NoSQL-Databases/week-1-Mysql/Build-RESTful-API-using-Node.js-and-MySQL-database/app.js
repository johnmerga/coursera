const express = require("express");
const cors = require("cors");

const config = require("./config/config.js");
const productRouter = require("./routes/product_routes");

const app = express();
const corsOption = {
  origin: "http://localhost:8081",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use("/api/v1/products", productRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
