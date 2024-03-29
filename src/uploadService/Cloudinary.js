const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration 
cloudinary.config({ 
    cloud_name: "dpqks8bvs", 
    api_key: "845448596562755", 
    api_secret: 'GKu1_IPbQITbsqLN0zjh8HMMq6o', 
    secure: true
});

async function uploadToCloudinary(locaFilePath) { 
	var mainFolderName = "main"; 
	var filePathOnCloudinary = 
		mainFolderName + "/" + locaFilePath; 
	return cloudinary.uploader 
		.upload(locaFilePath, { public_id: filePathOnCloudinary }) 
		.then((result) => {  
			fs.unlinkSync(locaFilePath); 

			return { 
				message: "Success", 
				url: result.url, 
			}; 
		}) 
		.catch((error) => {
			fs.unlinkSync(locaFilePath); 
			return { message: "Fail" }; 
		}); 
} 

module.exports = uploadToCloudinary;
