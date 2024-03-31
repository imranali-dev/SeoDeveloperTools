const mongoose = require('mongoose');
const Scammers = require('./model/scammermodel');

async function storeImageInDatabase(file) {
  try {
    const scammer = new Scammers(); // Instantiate model instance
    const gridFSBucket = new scammer.GridFSBucket(); // Access GridFSBucket from instance

    const stream = gridFSBucket.openUploadStream({
      filename: file.originalname,
      contentType: file.mimetype
    });

    await new Promise((resolve, reject) => {
      file.stream().pipe(stream).on('close', resolve).on('error', reject);
    });

    const storedFile = await gridFSBucket.findOne({ filename: file.originalname });
    return storedFile;
  } catch (error) {
    console.error('Error storing image:', error);
    throw error; // Re-throw for handling in controller
  }
}

module.exports = { storeImageInDatabase };
