const mongoose = require('mongoose');
const { Schema } = mongoose;

const socilapanelearning = require('../SocialSellModel'); // Import socilapanelearning schema
const detailsSchema = require('../BuyAccountjs/scehma'); // Import detailsSchema

const combinedSchema = new Schema({
  ...socilapanelearning, // Add fields from socilapanelearning schema
  ...detailsSchema, // Add fields from detailsSchema
});
const CombinedModel = mongoose.model('CombinedModel', combinedSchema);
const viewMoreDetails = async (serialNo) => {
  const socialSellRecord = await SocialSell.findOne({ serialNo });
  if (!socialSellRecord) {
    return null;
  }

  const combinedModelRecord = await CombinedModel.findOne({ serialNo });
  if (!combinedModelRecord) {
    return null;
  }

  // Access detailed information from merged schema
  const { accountFullname,
    descFull,
    siteAge,
    monthlyProfit,
    profitMargin,
    pageViews,
    profitMultiple,
    revenueMultiple,
    performanceOverviewimg,
    performanceOverviewDetails,
    moreDetailsimg,
    moreDetailsDetails,
    monthlyrevenueimg,
    monthlyrevenueDetails,
    accountAnalyticsimg,
    accountAnalyticsDetails,
    googleAnalyticsimg,
    googleAnalyticsDetails,
  } = combinedModelRecord;

  // Display detailed information in the frontend
  // ...
};
