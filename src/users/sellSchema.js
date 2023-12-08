const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    accountName: {
    type: String,
    required: [true, "account name is required"],
    minLength: [4, "account name should be greater than or equal to 4 characters"],
    maxLength: [15, "account name should be less than or equal to 15 characters"],
  },
  accountType: {
    type: String,
    required: [true, "account type is required"],
  },
  accountAge: {
    type: Number,
    required: [true, "account age is required"],
    min: 0, 
  },
  accountUrl: {
    type: String,
    required: [true, "account URL is required"],
  },
  accountImage: {
    type: String,
    required: [true, "account image is required"],
  },
  accountDesc: {
    type: String,
    required: [true, "account description is required"],
  },
  monetizationEnabled: {
    type: String,
    required: [true, "account monetization status is required"],
  },
  paymentMethod: { // i have change here paymentMethod instead of accountmethod  look good to pronounce
    type: String,
    required: [true, "account payment method is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    minLength: [10, "email should be greater than or equal to 10 characters"],
    maxLength: [30, "email should be less than or equal to 20 characters"],
  },
  contactNumber: {
    type: Number,
    required: [true, "contact number is required"],
     min: 0, 
  },
  telegramUsername: {
    type: String,
    required: [true, "Telegram username is required"],
    minLength: [5, "Telegram username should be greater than or equal to 5 characters"],
    maxLength: [20, "Telegram username should be less than or equal to 20 characters"],
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const SellModel = mongoose.model("SellAccountDb", userSchema);

module.exports = SellModel;
