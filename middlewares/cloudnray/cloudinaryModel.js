// cloudinaryModel.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const cloudnarySchma = require("./cloudnaryschma");

async function uploadToCloudinary(locaFilePath, fieldName) {
var mainFolderName = "akana";
const sanitizedFilePath = locaFilePath.replace(/[^a-zA-Z0-9\-_.\/]/g, ""); // Sanitize filename
const filePathOnCloudinary = `${mainFolderName}/${sanitizedFilePath}`; // Use forward slashes
try {
 const result = await cloudinary.uploader.upload(locaFilePath, { public_id: filePathOnCloudinary });

 await fs.unlink(locaFilePath);

 const updateObject = { [fieldName]: result.url };
 const newImage = new cloudnarySchma(updateObject);
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
