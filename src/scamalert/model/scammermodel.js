const mongoose = require('mongoose');
const scammerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
     
  },
  accountDeal: {
    type: String,
     
  },
  dealingDateTime: {
    type: Date,
     
  },
  screenshots: {
    type: [String],
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Scammers = mongoose.model('Scammers', scammerSchema);

module.exports = Scammers;
