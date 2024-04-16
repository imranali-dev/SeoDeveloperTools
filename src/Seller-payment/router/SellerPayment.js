const express = require('express');
const router = express.Router();
const SellerPayment = require('../contrllerSellerPayment/index');
const mongoose = require('mongoose');
const authenticateToken = require('../../../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/Uploadingimages');
const  Grid  = require('gridfs-stream');
const upload = require('../uploadfiles/uploadfile');

// Assuming GridFS configuration and connection
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Route to retrieve transition screenshots
router.get('/transitionScreenShot/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!file || file.length === 0) {
            console.error('File not found:', req.params.filename);
            return res.status(404).json({ error: 'File not found' });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            console.error('Not an image:', req.params.filename);
            res.status(400).json({ error: 'Not an image' });
        }
    });
});


router.delete('/:emailAddress', authenticateToken,SellerPayment.deleteUserByEmail);
router.get('/Delete/page', authenticateToken,SellerPayment.renderDeletePage);


router.post('/seller/payment/bycloud', uploadMiddleware,SellerPayment.createPaymentbycloud);

router.get('/payments/Get/All/Users', SellerPayment.getAllPayments);
router.get('/Seller-payments/Home/Pages', authenticateToken,SellerPayment.getAllPaymentsPages);
router.get('/Seller-payments/Home/Pages', authenticateToken,SellerPayment.getAllPaymentsPages);
router.get('/paymentPage/render/home',authenticateToken ,(req, res) => {
    res.render('renderHomeSellerPayemnt');
});
module.exports = router;

