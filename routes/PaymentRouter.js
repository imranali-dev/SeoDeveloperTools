const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const conn = mongoose.connection;
let gfs;
const upload = require('../Storage');
const { uploadImage, readFiles, RenderALlDetails, deletAccount } = require('../src/users/PaymentControoler');
const authenticateToken = require('../middlewares/authMiddleware');
//this is the route for uploading the image like this is the route you need to fetch in front 
router.post('/upload-image',upload.single('image'), uploadImage);
// you can get All the detai;s in the Api form in this way you can get id and delete payement 
router.get('/All_Payment_accounts_deatils',readFiles)
//  for deleting the comopnent 
router.delete('/Delete_Payment_accounts_deatils/:id', authenticateToken,deletAccount)
// i am going to commint it so you upload it using front 
router.get("/Create_Payment_accounts_deatils", authenticateToken,renderCreateForpament)
// i am going to delete it because not need of this
router.get("/Get_All_Payment_accounts_deatils", authenticateToken,renderGetAllDeatils)

//this is the ui you get all the deatils about the account payments
router.get('/accounts', authenticateToken,RenderALlDetails)
function renderCreateForpament(req, res) {
  res.render('PaymentAdd');
}
function renderGetAllDeatils(req, res) {
  res.render('GetAllPagment');
}

conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: 'uploads' // Your bucket name where images are stored
  });
});
// here in this way the imagee is showing
router.get('/image/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const readstream = gfs.openDownloadStreamByName(req.params.filename);
    readstream.pipe(res);
  });
});

router.get('/Welcome_to_Payment', authenticateToken,WelcomeEarningVideo)
function WelcomeEarningVideo(req, res) {
  res.render('WelcomePayment');
}
router.get('/Delete_the_Payment_deatails', authenticateToken,WelcomeEarningDelete)
function WelcomeEarningDelete(req, res) {
  res.render('PaymentDelete');
}
module.exports = router;
