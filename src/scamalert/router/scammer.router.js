const express = require('express');
const router = express.Router();
const { createScammer, getScammers, getScammer, deleteScammer, getScammersPage, deleteScammerAndRender, updateScammer, updatedscammmerformRender, getAdminScammers, ScammeralertHomepage } = require('../contrller/scammercontrllor');
const uploadToCloudinary = require('../../uploadService/Cloudinary');
const { buildSuccessMsg, upload } = require('../../uploadService/upload');
const Scammers = require('../model/scammermodel');
router.post('/scammers', createScammer);
router.get('/scammers',
  
    getScammers);
router.get('/scammers/:id', getScammer);
router.delete('/scammers/:id', deleteScammer);
router.get('/scammersPage', getScammersPage);
router.get('/scammers/delete/page', deleteScammerAndRender);
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

router.post(
    "/scammers",
    upload.array("scammer-files", 12),
    async (req, res, next) => {

        // req.files is array of `scammer-files` files 
        // req.body will contain the text fields, 
        // if there were any 
        var imageUrlList = [];

        for (var i = 0; i < req.files.length; i++) {
            var locaFilePath = req.files[i].path;

            // Upload the local image to Cloudinary 
            // and get image url as response 
            var result = await uploadToCloudinary(locaFilePath);
            imageUrlList.push(result.url);
        }

        // Now you can use imageUrlList to create a scammer
        // For example:
        // let scammer = createScammer(req.body, imageUrlList);
        // res.json(scammer);

        var response = buildSuccessMsg(imageUrlList);

        return res.send(response);
    }
);

