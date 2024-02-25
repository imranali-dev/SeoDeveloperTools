// routes/SellerFormRoutes.js
const express = require('express');
const router = express.Router();
const sellerFormController = require('../Contrller/contrller');
const { getAllSellerFormsRen } = require('../Contrller/Renderpage');
router.post('/Creats', sellerFormController.createSellerForm);
router.get('/:email', sellerFormController.getSellerFormByEmail);
router.get('/get', sellerFormController.getAllSellerForms);
router.get('/Api/getAllSellerFormsRen',getAllSellerFormsRen);
router.delete('/:email', sellerFormController.deleteSellerFormByEmail);
router.delete('/delete', sellerFormController.deleteSellerForm);
router.delete('/:eightDigitCode', sellerFormController.deleteSellerFormByCode);
router.get('/Api/delete', (req, res) => {
    res.render('deleteSellerForm');
  });
  router.get('/Api/Page/Create', (req, res) => {
    res.render('SellformCreate');
  });
  router.get('/Busineesspage/Home', (req, res) => {
    res.render('SellformHome');
  });

  
module.exports = router;
