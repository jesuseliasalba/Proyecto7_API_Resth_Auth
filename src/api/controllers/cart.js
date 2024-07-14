const Cart = require("../models/cart");

const createCart = async (req, res, next) => {
  try {
    const newCart = new Cart({
      shop: req.body.shop,
      users: req.body.users,
      products: req.body.products,
    });

    const cartCreated = await newCart.save();
    return res.status(201).json(cartCreated);
  } catch (error) {
    next(error);
  }
};

const listMyCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ users: id })
      .populate("products")
      .populate("users");
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json("No hay un carrito asociado a este usuario");
    }
  } catch (error) {
    next(error);
  }
};

const listCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("products").populate("users");
    return res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartModify = new Cart(req.body);
    cartModify._id = id;

    const cart = await Cart.findById(id);
    cart.users = cartModify.users[0] ? cartModify.users : cart.users;
    console.log(cart.users);
    cart.shop = cartModify.shop ? cartModify.shop : cart.shop;

    if (cartModify.products) {
      for (const product of cartModify.products) {
        if (!cart.products.includes(product)) {
          cart.products.push(product);
        }
      }
    }

    const cartUpdated = await Cart.findByIdAndUpdate(id, cart, {
      new: true,
    });

    return res.status(200).json(cartUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const cartDeleted = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json(cartDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  listMyCart,
  listCarts,
  updateCart,
  deleteCart,
};
