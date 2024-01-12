// cloudnaryschma.js
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  moreDetailsimg: String,
  performanceOverviewimg: String,
  monthlyrevenueimg: String,
  accountAnalyticsimg: String,
  googleAnalyticsimg: String,
});
const CloudinaryModel = mongoose.model("CloudinaryModel", ImageSchema);
module.exports = CloudinaryModel;
