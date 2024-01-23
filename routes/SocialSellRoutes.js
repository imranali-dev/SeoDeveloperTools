const express = require('express');
const { CreateSocialsell, GetSocialsell, UpdateSocialsell, DeleteSocialsell, GetSocialsellDetails } = require('../src/users/helpers/SocialSellControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
//this router has been checked 
router.post('/create-social-sells', authenticateToken,CreateSocialsell);
router.post('/create-social-sells', authenticateToken,CreateSocialsell);
router.get("/add/create-social-sells", authenticateToken,CreateSocialsellData)
router.post('/create-social-sells',CreateSocialsell);
function CreateSocialsellData(req, res) {

  res.render('SocialSelladd');
}
router.get('/get-social-sells',GetSocialsell);
router.get('/get-social-sells/:id', GetSocialsellDetails);
//for updating 
// //checked working or not // filhal kaam nahi kr rha hai 
router.put('/update-social-sells/:serialNo', authenticateToken,UpdateSocialsell);
router.get('/update-social-sells', authenticateToken,UpdateUpdateSocialsellData);
function UpdateUpdateSocialsellData(req, res) {

  res.render('SocialsellUpdate');
}
router.get('/welcomeSocialpages', authenticateToken,welcomeSocial);
function welcomeSocial(req, res) {
  res.render('WelcomeSocial');
}
router.delete('/delete-social-sells/:serialNo', DeleteSocialsell);
router.get('/delete-social-sells', authenticateToken,DeleteDeleteSocialsell);
function DeleteDeleteSocialsell(req, res) {

  res.render('SocialsellDelete');
}
module.exports = router;