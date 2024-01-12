const express = require('express');
const { createBuySell, getAllBuySell, updateBuySell, deleteBuySell, getAllBuySellDetails } = require('../src/users/helpers/BuyAndSellcontrllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
//this router has been checked 
router.post('/create-buy-sells',createBuySell);
router.get("/add/create-buy-sells", authenticateToken,createBuySellData)
function createBuySellData(req, res) {
  res.render('SellandBuyAdd');
}
router.get("/weltosocialpage/eyJsdfdsfdsfhdrthbGciOiJIU&68328463283232382723dfhasfahfkfdafk6486324zI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", authenticateToken,welcomepage)
function welcomepage(req, res) {
  res.render('WecomelBuyandsell');
}
// for front Use Only in next js Ahmed works
//also work on it and make sure for working in the backend
router.get('/get-buy-sells',getAllBuySell);
router.get('/get-buy-sells/:id',getAllBuySellDetails);
//for updating 
// checked working or not // filhal kaam nahi kr rha hai 
router.put('/update-buy-sells/:serialNo', authenticateToken,updateBuySell);
router.get('/update-buy-sells', authenticateToken,UpdateBuySellData);
function UpdateBuySellData(req, res) {

  res.render('UpdatingSeallandBuy');
}
router.delete('/delete-buy-sells/:serialNo', authenticateToken,deleteBuySell);
router.get('/delete-buy-sells', authenticateToken,DeleteBuySellData);
function DeleteBuySellData(req, res) {

  res.render('DeletesellandBuy');
}
module.exports = router;