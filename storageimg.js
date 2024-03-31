const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Storage MongoDB connected');
  })
  .catch((err) => {
    console.error('Storage MongoDB connection error:', err);
  });

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'storage MongoDB connection error:'));
conn.once('open', () => {
  console.log('MongoDB connected');
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    return {
      filename: uniqueFileName,
      bucketName: 'uploadfiles',
    };
  },
});
const uploads = multer({ storage });

module.exports = uploads;
