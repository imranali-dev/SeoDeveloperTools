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
const mobileWebSchema = new mongoose.Schema({
  SiteLink: String,
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  desc: String,
  exploreBusiness: {
    category: {
      type: String,

      required: true, 
    },
    data: businessCategorySchema,
  },
  graphic: {
    type: graphicSchema,
  },
  SiteLink: {
    type: mobileWebSchema,
  },
  seoSemPpc: {
    type: seoSemPpcSchema,
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (this.exploreBusiness.category === 'businessProposal' && !this.exploreBusiness.data.businessProposal) {
      throw new Error('Business proposal is required for "businessProposal" category');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
});

userSchema.post('save', async function (error, doc, next) {
  if (error) {
    console.error('Error saving user:', error);
  } else {
    console.log('User saved successfully:', doc);
  }
  next();
});

const Heria = mongoose.model('ExploreBusiness', userSchema);

module.exports = Heria;
