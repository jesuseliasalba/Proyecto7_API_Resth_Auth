require("dotenv").config();
const express = require("express");

const { ConnectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/user");
const productsRouter = require("./src/api/routes/product");
const cartsRouter = require("./src/api/routes/cart");

ConnectDB();

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/user", usersRouter);
app.use("/product", productsRouter);
app.use("/cart", cartsRouter);

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
