const mongoose = require('mongoose');

const socialPanelSchema = new mongoose.Schema({
  videoId: {
    type: String,
    unique: true,
    required: true,
  },
  socialMedia: {
    type: String,
    enum: ['Youtube'],
    required: true,
  },
  video: {
    url: {
      type: String,
      required: true,
    },
  },
});

const SocialLinks = mongoose.model('earning', socialPanelSchema);

module.exports = SocialLinks;
