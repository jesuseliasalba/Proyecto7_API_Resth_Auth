const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserInfo,
  updateOwnUser,
  deleteOwnUser,
} = require("../controllers/user");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const express = require("express");
const usersRoutes = express.Router();

usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.get("/me", [isAuth], getUserInfo);
usersRoutes.get("/", [isAdmin], getUsers);
usersRoutes.put("/:id", [isAdmin], updateUser);
usersRoutes.put("/", [isAuth], updateOwnUser);
usersRoutes.delete("/:id", [isAdmin], deleteUser);
usersRoutes.delete("/", [isAuth], deleteOwnUser);

module.exports = usersRoutes;
