// routes/buyerFormRoutes.js
const express = require('express');
const router = express.Router();
const buyerFormController = require('../Contrller/contrller');
const { getAllBuyerFormsRen } = require('../Contrller/Renderpage');
const authenticateToken = require('../../../middlewares/authMiddleware');

router.post('/Creating', buyerFormController.createBuyerForm);
router.get('/:email', buyerFormController.getBuyerFormByEmail);
router.get('/', buyerFormController.getAllBuyerForms);
router.delete('/:email', buyerFormController.deleteBuyerFormByEmail);
router.delete('/:eightDigitCode', authenticateToken,buyerFormController.deleteBuyerFormByCode);
router.get('/Api/getAllSellerFormsRen', authenticateToken,getAllBuyerFormsRen);

router.delete('/', authenticateToken,buyerFormController.deleteBuyerForm);
router.get('/Api/delete', authenticateToken,(req, res) => {
  res.render('deleteBuyerForm');
});
router.get('/BusinessPages/pages', authenticateToken,(req, res) => {
  res.render('buyerformCreate');
});
router.get('/BusinessPages/home', authenticateToken,(req, res) => {
  res.render('buyerformhome');
});
module.exports = router;

// autication added 
// const authenticateToken = require('../middlewares/authMiddleware');
