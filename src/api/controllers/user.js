const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign, verifyJwt } = require("../../config/jwt");

const registerUser = async (req, res, next) => {
  try {
    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("This username already exists");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      mail: req.body.mail,
    });

    const userCreated = await newUser.save();
    return res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("The username or password is incorrect");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json("The username or password is incorrect");
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  const user = req.user;
  res.status(200).json(user);
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userModify = new User(req.body);

    if (userModify.password) {
      let pw = userModify.password;
      pw = bcrypt.hashSync(pw, 10);
      userModify.password = pw;
    }

    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("This username already exists");
    }

    userModify._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, userModify, {
      new: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

const updateOwnUser = async (req, res, next) => {
  try {
    if (req.body.rol || req.body._id) {
      return res.status(401).json("No estas autorizado");
    }

    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("This username already exists");
    }

    const id = req.user._id;
    const userModify = new User(req.body);
    userModify._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, userModify, {
      new: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    next(error);
  }
};

const deleteOwnUser = async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user._id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  getUsers,
  updateUser,
  updateOwnUser,
  deleteUser,
  deleteOwnUser,
};
