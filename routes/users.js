const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/cleanbody");
const { validateToken } = require("../middlewares/validateToken");
const AuthController = require("../src/users/user.controller");
const { sell } = require("../src/users/Sell");
const AdminController = require("../src/users/Admincontrller");
router.post("/signup", cleanBody, AuthController.Signup);
router.patch("/activate", cleanBody, AuthController.Activate);
router.post("/login", cleanBody, AuthController.Login);
router.get("/logout", validateToken, AuthController.Logout);
router.get("/logout", validateToken, AuthController.Logout);
router.post('/sell' , cleanBody ,sell)
module.exports = router;