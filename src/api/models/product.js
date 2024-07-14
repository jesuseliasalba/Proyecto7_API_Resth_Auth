const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    supplier: { type: String, required: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema, "products");

module.exports = Product;
