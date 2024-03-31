const multer = require("multer");
const fs = require("fs");

// if (!fs.existsSync("./uploadstoCloud")) { 
//     fs.mkdirSync("./uploadstoCloud"); 
// }

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        cb(null, "./uploadstoCloud"); 
    }, 
    filename: function (req, file, cb) { 
        cb(null, file.originalname); 
    }, 
});

var upload = multer({ storage: storage });

function buildSuccessMsg(urlList) {  
	var response = `<h1> 
				<a href="/">Click to go to Home page</a><br> 
				</h1><hr>`; 

	for (var i = 0; i < urlList.length; i++) { 
		response += "File uploaded successfully.<br><br>"; 
		response += `FILE URL: <a href="${urlList[i]}"> 
					${urlList[i]}</a>.<br><br>`; 
		response += `<img src="${urlList[i]}" /><br><hr>`; 
	} 

	response += `<br> 
<p>Now you can store this url in database or 
// do anything with it based on use case.</p> 
`; 
	return response; 
} 

module.exports = { upload, buildSuccessMsg };
