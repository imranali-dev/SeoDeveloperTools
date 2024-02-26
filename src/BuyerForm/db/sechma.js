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
    match: /^\d{8}$/,
    validate: {
      validator: (value) => value.length === 8 && /^\d+$/.test(value),
      message: props => `${props.path} must be exactly 8 digits long`
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
const BuyerForm = mongoose.model('BuyerForm', buyerFormSchema);

module.exports = BuyerForm;
