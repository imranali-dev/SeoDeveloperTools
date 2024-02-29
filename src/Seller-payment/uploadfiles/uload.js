const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const crypto = require('crypto'); // for generating unique names
const path = require('path'); // for getting file extension

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return cb(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        cb(null, filename);
      });
    }
  });
  
const uploading = multer({ storage });

module.exports = uploading; // Export the uploading object
