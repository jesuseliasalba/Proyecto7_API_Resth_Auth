const { isAdmin, isAuth } = require("../../middlewares/auth");
const {
  createCart,
  listMyCart,
  listCarts,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

const cartsRouter = require("express").Router();

cartsRouter.post("/create", [isAdmin], createCart);
cartsRouter.get("/all", [isAdmin], listCarts);
cartsRouter.get("/", [isAuth], listMyCart);
cartsRouter.put("/:id", [isAdmin], updateCart);
cartsRouter.delete("/:id", [isAdmin], deleteCart);

module.exports = cartsRouter;
