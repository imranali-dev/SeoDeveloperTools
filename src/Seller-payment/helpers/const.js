const CloudinaryModel = require("./middle");

async function profileUploadSingle(req, res, next) {
    const buffer = req.file.buffer;
      var result = await CloudinaryModel.uploadToCloudinary(locaFilePath);
    var response = buildSuccessMsg([result.url]);
    return res.send(response);
}

module.exports = {
    profileUploadSingle,
};
