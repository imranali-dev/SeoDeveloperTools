
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt module
const AdminUser = require('./AdminModel');
const User = require('./user.model');
const SellModel = require('./sellSchema');
const { generateTokens } = require('../../middlewares/tokenGenerator');
require("dotenv").config();
const cookie = require('cookie');
const options = {
  expiresIn: "1h",
};
async function generateJwt(email, fname, lname) {
  try {
    const payload = { email: email, fname: fname, lname: lname };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
}
class AdminController {
  static async renderLoginPage(req, res) {
    res.render('Login');
  }
  static async AdminHome(req, res) {
    res.render('Initialbutton');
  }
  static async renderRegisterPage(req, res) {
    res.render('Rigester');
  }
  static async register(req, res) {
    const { fname, lname, email, password, userType } = req.body;
    try {
      const oldUser = await AdminUser.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: 'User Exists' });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const userdetails = await AdminUser.create({
        fname,
        lname,
        email,
        password: encryptedPassword,
        userType,
        isAdmin: true,
      });
      res.redirect(`/admin/admin/userdata`);
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
  
    try {
      const admin = await AdminUser.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid Password' });
      }
  
      const token = await generateTokens(email);
      console.log(token);
  
      res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
        httpOnly: true,
        maxAge: 3600,
        sameSite: 'strict',
        path: '/', 
        secure: process.env.NODE_ENV === 'production'
      }));
  
      res.redirect(`/admin/collection-ensureIndex/kira-yagami-082561-lira-Integrate-page-of-admin-931249/success`);
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async Allusersd(req, res) {
    try {
      const users = await User.find();
      res.render('AdminDashboard', { users });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }
  static async getUserData(req, res) {
    const { token } = req.body;

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return 'token expired';
        }
        return decoded;
      });

      if (user === 'token expired') {
        return res.send({ status: 'error', data: 'token expired' });
      }
      const useremail = user.email;

      AdminUser.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: 'ok', data: data });
        })
        .catch((error) => {
          res.send({ status: 'error', data: error });
        });
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message });
    }
  }

  static getSell(req, resp) {
    SellModel.find({}, (err, selldata) => {
      if (err) {
        return resp.status(500).json({ message: "Internal server error", error: err.message });
      }
      if (selldata.length === 0) {
        return resp.status(404).json({ message: "No sell data found" });
      }
      return resp.render('Selldata', { sells: selldata });
    });
  }
  static async Firstpage(req, res) {
    res.render('Buttontoggle');
  }
}
module.exports = AdminController;