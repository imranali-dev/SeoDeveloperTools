// services/uploadService.js

const uploadToCloudinary = require("./Cloudinary");
const { upload } = require("./upload");


const uploadImages = async (files) => {
    upload.array("profile-files", 5), 
	async (req, res, next) => { 
    const imageUrlList = [];
    for (let i = 0; i < files.length; i++) {
        const localFilePath = files[i].path;
        const result = await uploadToCloudinary(localFilePath);
        imageUrlList.push(result.url);
    }
    return imageUrlList;
};
}

module.exports = { uploadImages };
