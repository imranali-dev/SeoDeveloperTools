// models/BuyerForm.js
const mongoose = require('mongoose');
const getNextSequenceValue = require('../utils/getNextSequenceValue');

const buyerFormSchema = new mongoose.Schema({
  userInfo: {
    email: String,
    userName: String,
  },
  sellerUserName: String,
  totalAccountTypeAvailable: String,
  totalAccountIdAvailable: Number,
  eightDigitCode: {
    type: String,
    unique: true,
    match: /^\d{8}$/,
    validate: {
      validator: (value) => value.length === 8,
      message: props => `${props.path} must be exactly 8 digits long`
    }
  },
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

buyerFormSchema.pre('save', async function (next) {
  if (!this.eightDigitCodeRandom || !this.eightDigitCode) {
    try {
      if (!this.eightDigitCodeRandom) {
        this.eightDigitCodeRandom = generateRandom8DigitCode();
      }
      const sequence = await getNextSequenceValue('buyerForm');
      this.eightDigitCode = sequence.toString().padStart(8, '0');
    } catch (error) {
      console.error('Error generating eight-digit code:', error);
      const err = new Error('Failed to generate eight-digit code');
      err.originalError = error;
      return next(err);
    }
  }

  if (!this.accountId) {
    this.accountId = generateRandom8DigitCode();
  }

  next();
});

function generateRandom8DigitCode() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const BuyerForm = mongoose.model('BuyerForm', buyerFormSchema);

module.exports = BuyerForm;
