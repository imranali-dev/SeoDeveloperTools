// routes/SellerFormRoutes.js
const express = require('express');
const router = express.Router();
const sellerFormController = require('../Contrller/contrller');
const { getAllSellerFormsRen } = require('../Contrller/Renderpage');
const authenticateToken = require('../../../middlewares/authMiddleware');
router.post('/Creats', sellerFormController.createSellerForm);
// router.get('/:email', sellerFormController.getSellerFormByEmail);
router.get('/geting', sellerFormController.getSellers);
router.get('/get', sellerFormController.getAllSellerForms);
router.get('/Api/getAllSellerFormsRen',getAllSellerFormsRen);
router.delete('/:email', sellerFormController.deleteSellerFormByEmail);
router.delete('/delete', sellerFormController.deleteSellerForm);
router.delete('/:eightDigitCode', authenticateToken,sellerFormController.deleteSellerFormByCode);
router.get('/Api/delete', authenticateToken,(req, res) => {
    res.render('deleteSellerForm');
  });
  router.get('/Api/Page/Create', authenticateToken,(req, res) => {
    res.render('SellformCreate');
  });
  router.get('/Busineesspage/Home', authenticateToken,(req, res) => {
    res.render('SellformHome');
  });

  
module.exports = router;
