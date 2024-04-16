const express = require('express');
const router = express.Router();
const paymentController = require('../contrller/buyerCon'); // adjust the path to your controller file
const upload = require('../../../Storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const authenticateToken = require('../../../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/Uploadingimages');
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
router.get('/paymentScreenshot/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.get('/payments', paymentController.getAllPayments);
router.get('/user', paymentController.getUserData);
router.get('/users/data', paymentController.renderUserPage);

router.post('/payment', upload.single('paymentScreenshot'), paymentController.createPayment);
router.post('/payment/bycloud', uploadMiddleware,paymentController.createPaymentbycloud);

router.delete('/payment/:email', authenticateToken,paymentController.deletePaymentByEmail);
router.get('/Delete/page', authenticateToken,paymentController.renderDeletePage);

router.get('/PaymentPage/home', authenticateToken,(req, res) => {
    res.render('PaymentPageHome');
  });
  router.get('/paymentPage/render/home', authenticateToken,(req, res) => {
    res.render('renderHomePagePayemnt');
  });
module.exports = router;

