const uploadToCloudinary = require("./Cloudinary");

async function uploadImages(files) {
    try {
        const imageUrlList = [];
        for (let i = 0; i < files.length; i++) {
            const localFilePath = files[i].path;
            const result = await uploadToCloudinary(localFilePath);
            imageUrlList.push(result.url);
        }
        return imageUrlList;
    } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);
        throw error;
    }
}

module.exports = { uploadImages };
