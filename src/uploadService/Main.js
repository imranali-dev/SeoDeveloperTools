
const { upload, buildSuccessMsg } = require('./upload');
const uploadToCloudinary = require('./Cloudinary');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + "/public")); 
app.use("/uploads", express.static("uploads")); 

app.post( 
	"/profile-upload-single", 
	upload.single("profile-file"), 
	async (req, res, next) => { 
		var locaFilePath = req.file.path; 
		var result = await uploadToCloudinary(locaFilePath); 
		var response = buildSuccessMsg([result.url]); 
		return res.send(response); 
	} 
); 

app.post( 
	"/profile-upload-multiple", 
	upload.array("profile-files", 12), 
	async (req, res, next) => { 
		var imageUrlList = []; 
		for (var i = 0; i < req.files.length; i++) { 
			var locaFilePath = req.files[i].path; 
			var result = await uploadToCloudinary(locaFilePath); 
			imageUrlList.push(result.url); 
		} 
		var response = buildSuccessMsg(imageUrlList); 
		return res.send(response); 
	} 
); 

app.listen(3000, () => console.log('Server started on port 3000'));
