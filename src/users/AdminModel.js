const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
});

// userSchema.pre('save', async function (next) {
//   const adminCount = await AdminUser.countDocuments({ userType: 'admin' });

//   // Limit to two admin accounts
//   if (this.userType === 'admin' && adminCount >= 2) {
//     const err = new Error('Cannot create more than two admin accounts.');
//     return next(err);
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const AdminUser = mongoose.model('AdminRegisterDb', userSchema);

module.exports = AdminUser;
