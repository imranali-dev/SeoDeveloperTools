// const path = require('path');
// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const { GridFSBucket } = require('mongodb');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const GridFSStorage = require('multer-gridfs-storage');
// const gfs = new GridFSBucket(mongoose.connection, { bucketName: 'uploads', promiseLibrary: global.Promise });
// const Account = require('./PaymentModel');
// const storeImageInGridFS = async (filename, path) => {
//   const fileReadStream = fs.createReadStream(path);
//   const uploadStream = gfs.openUploadStream(filename);
//   fileReadStream.pipe(uploadStream);

//   // Remove the temporary file
//   fs.unlinkSync(path);
// };

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image uploaded.' });
//     }

//     const { name, email, phone, paymentMethod, description, accountBuyCheck, earningMoneyCheck } = req.body;
//     const image = req.file.filename;

//     // Check if the email address already exists in the collection and update if necessary
//     const updatedAccount = await Account.findOneAndUpdate(
//       { email },
//       {
//         name,
//         phone,
//         paymentMethod,
//         description,
//         accountBuyCheck,
//         earningMoneyCheck,
//         image,
//       },
//       { new: true, upsert: true }
//     );

//     if (!updatedAccount) {
//       // Email address doesn't exist, create a new account
//       const newAccount = new Account({
//         name,
//         email,
//         phone,
//         paymentMethod,
//         description,
//         accountBuyCheck,
//         earningMoneyCheck,
//         image,
//       });

//       await newAccount.save();
//     }

//     // Store the uploaded file to GridFS
//     const fileReadStream = fs.createReadStream(req.file.path);
//     const uploadStream = gfs.openUploadStream(req.file.filename);
//     fileReadStream.pipe(uploadStream);

//     // Remove the temporary file
//     fs.unlinkSync(req.file.path);

//     res.status(201).json({ message: 'Image uploaded successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error uploading image.' });
//   }
// };

// module.exports = {
//   uploadImage
// };
