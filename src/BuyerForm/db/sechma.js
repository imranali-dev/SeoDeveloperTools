// models/BuyerForm.js
const mongoose = require('mongoose');

const buyerFormSchema = new mongoose.Schema({
  userInfo: {
    email: String,
    userName: String,
  },
  sellerUserName: String,
  totalAccountTypeAvailable: String,
  totalAccountIdAvailable: Number,

  eightDigitCodeRandom: {
    type: String,
    unique: true,
    match: /^\d{8}$/,
    validate: {
      validator: (value) => value.length === 8,
      message: props => `${props.path} must be exactly 8 digits long`
    }
  },
  accountId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const BuyerForm = mongoose.model('BuyerForm', buyerFormSchema);

module.exports = BuyerForm;
