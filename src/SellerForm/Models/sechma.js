const mongoose = require('mongoose');

const sellerFormSchema = new mongoose.Schema({
  userInfo: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  accountDetails: {
    accountType: {
      type: String,
      required: true,
    },
    BuyeruserName: {
      type: String,
      required: true,
    },
    accountPaymentReceivedFromBuyer: {
      type: Number,
      required: true,
    },

  },
  sellerFormMainBuyerGCFCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SellerForm = mongoose.model('SellerForm', sellerFormSchema);

module.exports = SellerForm;
