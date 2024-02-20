// models/SellerForm.js
const mongoose = require('mongoose');
const getNextSequenceValue = require('../Helpers/getNextSequenceValue');

const sellerFormSchema = new mongoose.Schema({
  userInfo: {
    userName: {
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
    accountId: {
      type: String,
      required: true,
    },
    accountPaymentReceivedFromBuyer: {
      type: String,
      required: true,
    },
  },
  eightDigitCode1: {
    type: String,
    // required: true,
    // unique: true,
    match: /^\d{8}$/,
    validate: {
      validator: (value) => value.length === 8,
      message: props => `${props.path} must be exactly 8 digits long`
    }
  },
  eightDigitCode2: {
    type: String,
    // required: true,
    unique: true,
    match: /^\d{8}$/,
    validate: {
      validator: (value) => value.length === 8,
      message: props => `${props.path} must be exactly 8 digits long`
    }
  },
  sellerFormMainBuyerGCFCode: {
    type: String,
    required: true,
  },
});

sellerFormSchema.pre('save', async function (next) {
    
  // if (!this.eightDigitCode1) {
  //   try {
  //     const sequence = await getNextSequenceValue('SellerForm');
  //     this.eightDigitCode1 = sequence.toString().padStart(8, '0');
  //   } catch (error) {
  //     console.error('Error generating eight-digit code 1:', error);
  //     return next(new Error('Failed to generate eight-digit code 1'));
  //   }
  // }
  
  if (!this.eightDigitCode2) {
    try {
      this.eightDigitCode2 = eightDigitCode2(); // Assuming eightDigitCode2() generates a code
    } catch (error) {
      console.error('Error generating eight-digit code 2:', error);
      return next(new Error('Failed to generate eight-digit code 2'));
    }
  }
  
  next();
});

function eightDigitCode2() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}
const SellerForm = mongoose.model('SellerForm', sellerFormSchema);

module.exports = SellerForm;