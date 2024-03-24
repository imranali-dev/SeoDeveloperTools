const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  selectPaymentMethod: {
    type: String,
    enum: ['jazzCash', 'easyPaisa', 'bankAccount', 'crypto', 'Payoneer', 'Skrill', 'Coinbase'],
  },
  description: {
    type: String,
  },
  userName: {
    type: String,
  },
  totalAccountPrice: {
    type: String
  },
  transitionId: {
    type: String,
  },
  transactionDate: { type: Date, default: Date.now },

  image: {
    type: String,
    default: 'https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2021/02/ready-player-me-avatar-vrchat.jpg',
  },
});
AccountSchema.index({ createdAt: -1 });

const Account = mongoose.model('paymentFormHistory', AccountSchema);

module.exports = Account;
