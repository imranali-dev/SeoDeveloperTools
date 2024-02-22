const express = require('express');
const router = express.Router();
const paymentController = require('../contrller/buyerCon'); // adjust the path to your controller file
const upload = require('../../../Storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


// Create a GridFS stream
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Route for serving files
router.get('/paymentScreenshot/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
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

// router.delete('/payment/:id', paymentController.deletePayment);
router.delete('/payment/:email', paymentController.deletePaymentByEmail);
router.get('/Delete/page', paymentController.renderDeletePage);

// Define route to delete a user by email
// router.post('/delete/:email', paymentController.deletePaymentByEmail);
module.exports = router;


