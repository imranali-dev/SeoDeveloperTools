// models/Scammer.js

const mongoose = require('mongoose');
const scammerSchema = new mongoose.Schema({
    name: {
        
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    accountDeal: {
        type: String,
        required: true
    },
    dealingDateTime: {
        type: Date,
        required: true
    },
    screenshot: {
        type: String,
        default: 'https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2021/02/ready-player-me-avatar-vrchat.jpg',
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

const Scammers = mongoose.model('Scammers', scammerSchema);

module.exports = Scammers;
