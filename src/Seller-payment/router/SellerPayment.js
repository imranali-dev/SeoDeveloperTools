const express = require('express');
const router = express.Router();
const SellerPayment = require('../contrllerSellerPayment/index');
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

router.get('/transitionScreenShot/:filename', (req, res) => {
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
router.delete('/:emailAddress', authenticateToken,SellerPayment.deleteUserByEmail);
router.get('/Delete/page', authenticateToken,SellerPayment.renderDeletePage);

router.post('/seller/payment/add', upload.single('transitionScreenShotss'), SellerPayment.createPayment);

router.post('/seller/payment/bycloud', uploadMiddleware,SellerPayment.createPaymentbycloud);

router.get('/payments/Get/All/Users', SellerPayment.getAllPayments);
router.get('/Seller-payments/Home/Pages', authenticateToken,SellerPayment.getAllPaymentsPages);
router.get('/Seller-payments/Home/Pages', authenticateToken,SellerPayment.getAllPaymentsPages);
router.get('/paymentPage/render/home',authenticateToken ,(req, res) => {
    res.render('renderHomeSellerPayemnt');
});
module.exports = router;

