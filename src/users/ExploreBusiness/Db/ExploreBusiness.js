const mongoose = require('mongoose');

const businessCategorySchema = new mongoose.Schema({
  businessProposal: String,
});

const graphicSchema = new mongoose.Schema({
  logo: String,
});

const seoSemPpcSchema = new mongoose.Schema({
  website: String,
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  desc: String,
  exploreBusiness: {
    category: {
      type: String,
      enum: ['businessProposal', 'otherCategory'], // Add other categories as needed
      required: true, // Enforce category selection
    },
    data: businessCategorySchema,
  },
  graphic: {
    type: graphicSchema,
  },
  mobileWeb: String,
  website: String,
  seoSemPpc: {
    type: seoSemPpcSchema,
  },
});

userSchema.pre('save', async function (next) {
  try {
    // Perform validations or other pre-save actions
    if (this.exploreBusiness.category === 'businessProposal' && !this.exploreBusiness.data.businessProposal) {
      throw new Error('Business proposal is required for "businessProposal" category');
    }

    next(); // Proceed to save if validations pass
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

userSchema.post('save', async function (error, doc, next) {
  if (error) {
    console.error('Error saving user:', error);
    // Handle the error appropriately, e.g., send a response to the client
  } else {
    console.log('User saved successfully:', doc);
  }
  next();
});

const Heria = mongoose.model('ExploreBusiness', userSchema);

module.exports = Heria;
