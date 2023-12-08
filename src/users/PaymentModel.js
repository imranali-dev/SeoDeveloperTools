const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
    },
  },
  phone: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ['jazzCash', 'easyPaisa', 'bankAccount', 'crypto', 'Payoneer', 'Skrill', 'Coinbase'],
  },
  description: {
    type: String,
  },
  accountBuyCheck: {
    type: String,
  },
  earningMoneyCheck: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2021/02/ready-player-me-avatar-vrchat.jpg',
  },
});

const Account = mongoose.model('paymentFormHistory', AccountSchema);

module.exports = Account;
