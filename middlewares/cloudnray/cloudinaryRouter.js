const express = require("express");
const multer = require("multer");
const cloudinaryController = require("./cloudinaryController");
const { getAllImages } = require("./gelcloudnaryimages");
const authenticateToken = require("../authMiddleware");

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./cloudinaryupload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/profile-upload-single",
    upload.single("profile-file"),
    cloudinaryController.profileUploadSingle
);

router.post(
    "/profile-upload-multiple",
    upload.array("profile-files", 6),
    cloudinaryController.profileUploadMultiple
);
router.get('/upload-form',authenticateToken, (req, res) => {
    res.render('cloudniry');
});
router.get(
    "/all-images-urls",authenticateToken,
    getAllImages
);
module.exports = router;
