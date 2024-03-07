const cloudinaryModel = require("./cloudinaryModel");
const { buildSuccessMsg } = require("./viewHelper");

async function profileUploadSingle(req, res, next) {
    var locaFilePath = req.file.path;
    const buffer = req.file.buffer;
      var result = await cloudinaryModel.uploadToCloudinary(locaFilePath);
    var response = buildSuccessMsg([result.url]);
    return res.send(response);
}
async function profileUploadMultiple(req, res, next) {
    try {
      var imageUrlList = [];
      const imageFields = ["moreDetailsimg", "performanceOverviewimg", "monthlyrevenueimg", "accountAnalyticsimg", "googleAnalyticsimg"];
  
      for (var i = 0; i < req.files.length; i++) {
        var locaFilePath = req.files[i].path;
        const fieldName = imageFields[i];
  
        try {
          const result = await cloudinaryModel.uploadToCloudinary(locaFilePath, fieldName);
  
          const updateObject = { [fieldName]: result.url };
  
          await cloudinaryModel.findOneAndUpdate({}, updateObject, { upsert: true, new: true });
  
          imageUrlList.push(result.url);
          
        } catch (error) {
          console.error("Error processing image", i + 1, ":", error);
          imageUrlList.push("Error: Image upload failed");
          console.error("Error type:", error.constructor.name);

        }
      }
      var response = buildSuccessMsg(imageUrlList);
      return res.send(response);
    } catch (error) {
      
      console.error("Unhandled error in profileUploadMultiple:", error);
      return res.status(500).send("Internal server error");
    }
  }

module.exports = {
    profileUploadSingle,
    profileUploadMultiple,
};
