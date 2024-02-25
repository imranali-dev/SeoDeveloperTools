// routes/buyerFormRoutes.js
const express = require('express');
const router = express.Router();
const buyerFormController = require('../Contrller/contrller');
const { getAllBuyerFormsRen } = require('../Contrller/Renderpage');

router.post('/Creating', buyerFormController.createBuyerForm);
router.get('/:email', buyerFormController.getBuyerFormByEmail);
router.get('/', buyerFormController.getAllBuyerForms);
router.delete('/:email', buyerFormController.deleteBuyerFormByEmail);
router.delete('/:eightDigitCode', buyerFormController.deleteBuyerFormByCode);
router.get('/Api/getAllSellerFormsRen', getAllBuyerFormsRen);

router.delete('/', buyerFormController.deleteBuyerForm);
router.get('/Api/delete', (req, res) => {
  res.render('deleteBuyerForm');
});
router.get('/BusinessPages/pages', (req, res) => {
  res.render('buyerformCreate');
});
router.get('/BusinessPages/home', (req, res) => {
  res.render('buyerformhome');
});
module.exports = router;
