const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  try {
    const productUnique = await Product.findOne({ name: req.body.name });
    if (productUnique !== null) {
      return res.status(400).json("This product already exist");
    }
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      supplier: req.body.supplier,
    });

    const productCreated = await newProduct.save();
    return res.status(201).json(productCreated);
  } catch (error) {
    next(error);
  }
};

const listProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productUnique = await Product.findOne({ name: req.body.name });
    if (productUnique !== null) {
      return res.status(400).json("This product already exist");
    }
    const { id } = req.params;
    const productModify = new Product(req.body);
    productModify._id = id;
    const productUpdated = await Product.findByIdAndUpdate(id, productModify, {
      new: true,
    });
    return res.status(200).json(productUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(productDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, listProducts, updateProduct, deleteProduct };
