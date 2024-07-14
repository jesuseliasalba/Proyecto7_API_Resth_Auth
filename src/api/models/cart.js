const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    shop: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema, "carts");

module.exports = Cart;
