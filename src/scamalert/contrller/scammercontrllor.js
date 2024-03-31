
const { uploadImages } = require("../../uploadService/uploadfinal");
const { storeImageInDatabase } = require("../imageStorage");
const Scammers = require("../model/scammermodel");
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage }).array('screenshots', 5); // Adjust maxCount as needed

exports.createScammer = async (req, res) => {
    try {
        // Process the uploaded files
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to store the files' });
            }

            // Extract the filenames from req.files
            const screenshots = req.files.map((file) => `uploads/${file.filename}`);

            // Create a new scammer instance
            const scammer = new Scammers({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                country: req.body.country,
                accountDeal: req.body.accountDeal,
                dealingDateTime: req.body.dealingDateTime,
                screenshots, // Array of image URLs
                isAdmin: req.body.isAdmin
            });

            // Save the scammer data to the database
            await scammer.save();

            res.status(201).json({ success: true, data: scammer });
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// is admin forms
exports.getAdminScammers = async (req, res) => {
    try {
        const adminScammers = await Scammers.find({ isAdmin: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: adminScammers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getScammers = async (req, res) => {
    try {
        const scammers = await Scammers.find(({ isAdmin: false })).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: scammers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getScammer = async (req, res) => {
    try {
        const scammer = await Scammers.findById(req.params.id);

        if (!scammer) {
            return res.status(404).json({
                success: false,
                error: 'No scammer found'
            });
        }

        res.status(200).json({
            success: true,
            data: scammer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a scammer
exports.deleteScammer = async (req, res) => {
    try {
        const scammer = await Scammers.findById(req.params.id);

        if (!scammer) {
            return res.status(404).json({
                success: false,
                error: 'No scammer found'
            });
        }

        await scammer.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


exports.getScammersPage = async (req, res) => {
    try {
        const scammers = await Scammers.find().sort({ createdAt: -1 });

        res.render('scammers', { scammers });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a scammer and render a page
exports.deleteScammerAndRender = async (req, res) => {
    try {

        res.render('scammerdelte');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


exports.updateScammer = async (req, res) => {
    const imageUrlList = await uploadImages(req.files);
    try {
        const { id } = req.params;
        const { name, phoneNumber, country, accountDeal, dealingDateTime, screenshot: imageUrlList, isAdmin } = req.body;

        const updatedScammer = await Scammers.findByIdAndUpdate(
            id,
            {
                name,
                phoneNumber,
                screenshot: imageUrlList,
                country,
                accountDeal,
                dealingDateTime,
                isAdmin
            },
            { new: true }
        );

        if (!updatedScammer) {
            return res.status(404).json({
                success: false,
                error: 'Scammer not found',
            });
        }

        res.status(200).json({
            success: true,
            data: updatedScammer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updatedscammmerformRender = async (req, res) => {
    try {

        res.render('scammerUpdateform');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.ScammeralertHomepage = async (req, res) => {
    try {
        res.render('ScammeralertHomepage');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};



