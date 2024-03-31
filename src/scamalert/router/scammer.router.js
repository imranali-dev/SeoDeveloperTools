const express = require('express');
const router = express.Router();
const { createScammer, getScammers, getScammer, deleteScammer, getScammersPage, deleteScammerAndRender, updateScammer, updatedscammmerformRender, getAdminScammers, ScammeralertHomepage } = require('../contrller/scammercontrllor');
const uploadToCloudinary = require('../../uploadService/Cloudinary');
const { buildSuccessMsg, upload } = require('../../uploadService/upload');
const Scammers = require('../model/scammermodel');
const uploads = require('../../../storageimg');
const uploadMiddleware = require('../../../uploadingimaging');
const fs = require('fs');
const { saveImageToGridFS } = require('../../../GridFS');
const { Readable } = require('stream'); // Ensure Readable is imported
const { uploadImages } = require('../../uploadService/uploadfinal');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
router.post('/scammers', uploadMiddleware, async (req, res) => {
    try {
        const screenshots = req.files.map((file) => `uploads/${file.filename}`);
        
        // Assuming `db` is defined somewhere before this code
        // Make sure `db` represents the MongoDB database connection
        const db = process.env.MONGO_URI

        // Save images to GridFS
        await Promise.all(screenshots.map(async (filePath) => {
            const filename = filePath.split('/').pop(); // Extract filename from path
            const imageStream = fs.createReadStream(filePath); // Read image file
            await saveImageToGridFS(db, filename, imageStream); // Save image to GridFS
            fs.unlinkSync(filePath); // Delete local file after saving to GridFS
        }));

        // Create a scammer document
        const scammer = new Scammers({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            country: req.body.country,
            accountDeal: req.body.accountDeal,
            dealingDateTime: req.body.dealingDateTime,
            screenshots, // Array of image URLs
            isAdmin: req.body.isAdmin
        });

        // Save scammer document to the database
        await scammer.save();

        res.status(201).json({ success: true, data: scammer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/scammers/test', uploadMiddleware, async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, error: 'No files uploaded' });
        }

        // Upload images to Cloudinary
        const imageUrlList = await uploadImages(files);

        // Create a scammer document
        const scammer = new Scammers({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            country: req.body.country,
            accountDeal: req.body.accountDeal,
            dealingDateTime: req.body.dealingDateTime,
            screenshots: imageUrlList, // Array of image URLs
            isAdmin: req.body.isAdmin
        });

        // Save scammer document to the database
        await scammer.save();

        // Send response with success and data
        res.status(201).json({ success: true, data: scammer });
    } catch (error) {
        // Send error response
        res.status(500).json({ success: false, error: error.message });
    }
});


// ...
router.get('/scammers',getScammers);
router.get('/scammers/:id', getScammer);
router.delete('/scammers/:id', deleteScammer);
router.get('/scammersPage', getScammersPage);
router.get('/scammers/delete/page',deleteScammerAndRender);
router.put('/scammers/:id', updateScammer);
router.get('/scammers/Update/page', updatedscammmerformRender);
router.get('/scammers/admin/page', getAdminScammers);
router.get('/scammers/Home/page', ScammeralertHomepage);


router.post('/verify/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedScammer = await Scammers.findByIdAndUpdate(id, { isVerified: true }, { new: true });

        if (!updatedScammer) {
            return res.status(404).json({ message: 'Scammer not found' });
        }

        return res.status(200).json({ message: 'Scammer verified successfully', updatedScammer });
    } catch (error) {
        console.error('Error verifying scammer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

// router.post(
//     "/scammers",
//     upload.array("scammer-files", 12),
//     async (req, res, next) => {

//         // req.files is array of `scammer-files` files 
//         // req.body will contain the text fields, 
//         // if there were any 
//         var imageUrlList = [];

//         for (var i = 0; i < req.files.length; i++) {
//             var locaFilePath = req.files[i].path;

//             // Upload the local image to Cloudinary 
//             // and get image url as response 
//             var result = await uploadToCloudinary(locaFilePath);
//             imageUrlList.push(result.url);
//         }

//         // Now you can use imageUrlList to create a scammer
//         // For example:
//         // let scammer = createScammer(req.body, imageUrlList);
//         // res.json(scammer);

//         var response = buildSuccessMsg(imageUrlList);

//         return res.send(response);
//     }
// );

