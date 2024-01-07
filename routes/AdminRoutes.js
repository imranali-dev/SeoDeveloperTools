
const express = require("express");
const router = express.Router();
const AdminController = require("../src/users/Admincontrller");
const authenticateToken = require("../middlewares/authMiddleware");
const AdminUserkeys = require("../src/users/adminkeys");
const { Signup, Login, Activate, Logout, Allusers } = require("../src/users/adminsignup");
router.get('/',authenticateToken, AdminController.AdminHome);
router.post('/admin/login', Login);
router.get('/admin/userdata',authenticateToken, AdminController.Allusersd);
router.get('/admin/login/page', AdminController.renderLoginPage);
router.get('/admin/sell',authenticateToken,AdminController.getSell)
router.get('/collection-ensureIndex/kira-yagami-082561-lira-Integrate-page-of-admin-931249/success',authenticateToken,AdminController.Firstpage)
router.get('/admin/signuppage',AdminController.renderRegisterPage);
router.post('/admin/register' ,Signup);
router.get('/admin/activete' ,Allusers);
router.post('/admin/Activate' ,Activate);
router.get('/admin/logout', Logout);
module.exports = router;
