const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellerPaymt = new Schema({
  emailAddress: { type: String, required: true },
  selectPaymentMethod: { type: String, required: true },
  transitionId: { type: String, required: true },
  userName: { type: String, required: true },
  totalAccountPrice: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  uniquePin: { type: Number, required: true,unique:true },
  sellerEmailAddress: { type: String, required: true },
  accountSerialNo: { type: Number, required: true },
  accountType: { type: String, required: true },
  accountPrice: { type: Number, required: true },
  accountTax: { type: Number, required: true },
  transitionIdDate: { type: String },
  paymentAccountName: { type: String, required: true },
  paymentAccountAddress: { type: String, required: true },
  buyerCode: { type: String, required: true },
  sellerCode: { type: String, required: true },
  transitionScreenShot: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

SellerPaymt.pre('save', function (next) {
  if (!this.uniquePin) {
    this.uniquePin = Math.floor(Math.random() * 900000) + 100000;
  }
  next();
});

SellerPaymt.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});
const SellerPayment = mongoose.model('Seller-Payment', SellerPaymt);

module.exports = SellerPayment; 
