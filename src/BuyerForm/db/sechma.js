// models/BuyerForm.js
const mongoose = require('mongoose');
// const getNextSequenceValue = require('../utils/getNextSequenceValue');

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
      validator: (value) => value.length === 8 && /^\d+$/.test(value), // Ensure only digits
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

// buyerFormSchema.pre('save', async function (next) {
//   try {
//     if (!this.eightDigitCodeRandom) {
//       this.eightDigitCodeRandom = await getNextSequenceValue('buyer_forms_eight_digit_code'); // Use a sequence for uniqueness
//     }

//     if (!this.accountId) {
//       this.accountId = generateRandom8DigitCode();
//     }
//   } catch (error) {
//     console.error('Error generating codes:', error);
//     next(error);
//   }

//   next();
// });

// function generateRandom8DigitCode() {
//   return Math.floor(10000000 + Math.random() * 90000000).toString();
// }

const BuyerForm = mongoose.model('BuyerForm', buyerFormSchema);

module.exports = BuyerForm;
