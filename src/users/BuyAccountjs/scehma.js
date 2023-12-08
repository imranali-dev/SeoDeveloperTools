const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailsSchema = new Schema({
  accountFullname: {
    type: String,
    required: true,
  },
  descFull: {
    type: String,
  },
  siteAge: {
    type: Number,
    required: true,
  },
  monthlyProfit: {
    type: Number,
    required: true,
  },
  profitMargin: {
    type: Number,
    required: true,
  },
  pageViews: {
    type: Number,
    required: true,
  },
  profitMultiple: {
    type: String,
    required: true,
  },
  revenueMultiple: {
    type: String,
    required: true,
  },
  performanceOverviewimg: {
    type: String, 
  },

  performanceOverviewDetails: {
    type: String,
  },
  moreDetailsimg: {
    type: String, 
  },
  moreDetailsDetails: {
    type: String,
  },
  monthlyrevenueimg: {
    type: String, 
  },
  monthlyrevenueDetails: {
    type: String,
  },
  accountAnalyticsimg: {
    type: String,
  },
  accountAnalyticsDetails: {
    type: String,
  },
  googleAnalyticsimg: {
    type: String, 
  },
  googleAnalyticsDetails: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BuyandsellSchma = mongoose.model("accountViewdetails", detailsSchema);

module.exports = BuyandsellSchma;
// comb