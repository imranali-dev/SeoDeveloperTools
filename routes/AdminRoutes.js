
const express = require("express");
const router = express.Router();
const AdminController = require("../src/users/Admincontrller");

router.get('/', AdminController.AdminHome);
router.post('/admin/login', AdminController.login);
router.get('/admin/userdata', AdminController.Allusers);
router.get('/admin/login/page', AdminController.renderLoginPage);
router.get('/admin/sell',AdminController.getSell)
router.get('/collection-ensureIndex/kira-yagami-082561-lira-Integrate-page-of-admin-931249/success',AdminController.Firstpage)
router.get('/admin/signuppage', AdminController.renderRegisterPage);
router.post('/admin/register', AdminController.register);
module.exports = router;