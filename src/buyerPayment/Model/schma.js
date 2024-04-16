const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({

  email: { type: String, required: true },
  selectPaymentMethod: { type: String, required: true },
  transitionId: { type: String, required: true },
  userName: { type: String, required: true },
  totalAccountPrice: { type: Number, required: true },
  firstName: String,
  lastName: String,
  uniquePin: { type: String, default: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
  sellerEmail: String,
  accountSerialNo: String,
  accountType: String,
  accountPrice: Number,
  accountTax: { type: Number, default: 0.00 },
  paymentScreenshot: [String],
  transitionData: String,
  transactionDate: { type: Date, default: Date.now },
  transactionTime: { type: String, default: () => new Date().toLocaleTimeString() }
});

const Payment = mongoose.model('buyerPayment', PaymentSchema);

module.exports = Payment;
