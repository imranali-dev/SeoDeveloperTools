const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  uniquePin: { type: String, default: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
  email: String,
  sellerEmail: String,
  accountSerialNo: String,
  accountType: String,
  accountPrice: Number,
  accountTax: { type: Number, default: 0.00 },
  totalAccountPrice: Number,
  adminPayment: String,
  paymentScreenshot: String,
  transitionId: String,
  transitionData: String,
  transactionDate: { type: Date, default: Date.now },
  transactionTime: { type: String, default: () => new Date().toLocaleTimeString() }
});

const Payment = mongoose.model('buyerPayment', PaymentSchema);

module.exports = Payment;
