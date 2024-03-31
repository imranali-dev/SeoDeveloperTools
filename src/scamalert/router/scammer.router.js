const express = require('express');
const router = express.Router();
const { createScammer, getScammers, getScammer, deleteScammer, getScammersPage, deleteScammerAndRender, updateScammer, updatedscammmerformRender, getAdminScammers, ScammeralertHomepage } = require('../contrller/scammercontrllor');

const Scammers = require('../model/scammermodel');
const uploadMiddleware = require('../../../uploadingimaging');
const { uploadImages } = require('../../uploadService/uploadfinal');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
// Fetch it with POST to show images
router.post('/scammers', uploadMiddleware, async (req, res) => {
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
            screenshots: imageUrlList, 
            isAdmin: req.body.isAdmin
        });
        await scammer.save();

        res.status(201).json({ success: true, data: scammer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/scammers',getScammers);
router.get('/scammers/:id', getScammer);
router.delete('/scammers/:id', deleteScammer);
router.get('/scammersPage', getScammersPage);
router.get('/scammers/delete/page',deleteScammerAndRender);
router.put('/scammers/:id', updateScammer);
router.get('/scammers/Update/page', updatedscammmerformRender);
// Fetch it with FRONT to show images
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

