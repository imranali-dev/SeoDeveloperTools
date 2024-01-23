// cloudinaryModel.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const CloudinaryModel = require("./cloudnaryschma");

async function uploadToCloudinary(locaFilePath, fieldName) {

    var mainFolderName = "main";
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;

    try {
        const result = await cloudinary.uploader.upload(locaFilePath, { public_id: filePathOnCloudinary });

        await fs.unlink(locaFilePath);

        // Dynamically create an object with the provided fieldName
        const updateObject = { [fieldName]: result.url };
        const newImage = new CloudinaryModel(updateObject);
        await newImage.save();

        return { message: "Success", url: result.url };
    } catch (error) {
        console.error(error);
        return { message: "Fail" };
    }
}



module.exports = {
    uploadToCloudinary,
};
