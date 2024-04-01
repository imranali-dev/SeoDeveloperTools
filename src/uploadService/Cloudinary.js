const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration 
cloudinary.config({ 
    cloud_name: 'dowzkkkon', 
  api_key: '611346773349953', 
  api_secret: '6G_OmXJMzEQ7Q9d4V0xaZw7Pmm8' ,
    secure: true
});

// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
  
// });

// cloudinary.config({ 
//     cloud_name: "dzcmgyrpl", 
//     api_key: "269231581345278",
//     api_secret: 'WPCgeujQXUvriQJ8xgIt3iRCwfQ', 
//     secure: true
// });

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
