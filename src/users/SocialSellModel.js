const mongoose = require('mongoose');
const { Schema } = mongoose;
const validateDescriptionLength = (description) => {
  const wordCount = description.trim().split(/\s+/).length;
  return wordCount <= 20;
};

const detailsSchema = new Schema({
  accountFullname: {
    type: String,
    required: true,
  },
  descFull: {
    type: String,
    validate: [validateDescriptionLength, 'Description must be less than 20 words'],
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

const socilapanelearning = new Schema({
  serialNo: {
    type: Number,
    required: true,
  },
  earningPlatforms: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  aboutThisAccount: {
    accPrice: {
      type: String,
      required: true,
    },
    accName: {
      type: String,
    },
    accountUrl: {
      type: String,
      required: true,
    },
    accountAge: {
      type: Number,
      required: true,
    },
  },
  details: detailsSchema, // Embed detailsSchema as a subdocument
});

const SocialSell = mongoose.model('SocialAccountDb', socilapanelearning);

module.exports = SocialSell;


// ===================================
// to to continue
