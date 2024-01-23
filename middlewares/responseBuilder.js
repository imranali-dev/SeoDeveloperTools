const cloudinary = require("cloudinary").v2; 
const fs = require("fs"); 
if (!fs.existsSync("./uploads")) { 
	fs.mkdirSync("./uploads"); 
} 
var storage = multer.diskStorage({ 
	destination: function (req, file, cb) { 
		cb(null, "./uploads"); 
	}, 
	filename: function (req, file, cb) { 
		cb(null, file.originalname); 
	}, 
}); 

var upload = multer({ storage: storage }); 

app.use(express.static(__dirname + "/public")); 
app.use("/uploads", express.static("uploads")); 

          
cloudinary.config({ 
  cloud_name: '*******', 
  api_key: '******', 
  api_secret: '*********' 
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
module.exports = { uploadToCloudinary };