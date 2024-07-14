const { isAdmin, isAuth } = require("../../middlewares/auth");
const {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productsRouter = require("express").Router();

productsRouter.post("/create", [isAdmin], createProduct);
productsRouter.get("/", [isAuth], listProducts);
productsRouter.put("/:id", [isAdmin], updateProduct);
productsRouter.delete("/:id", [isAdmin], deleteProduct);

module.exports = productsRouter;
