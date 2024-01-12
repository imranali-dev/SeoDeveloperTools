// Import necessary modules and models
const CloudinaryModel = require("./cloudnaryschma");
const path = require('path');

// Define the route to get all images
async function getAllImages(req, res, next) {
    try {
        const allImages = await CloudinaryModel.find({}, "-_id -__v");
        res.render('getcloudnaryimages', { images: allImages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving images" });
    }
}

// Export the route
module.exports = {
    getAllImages,
};
