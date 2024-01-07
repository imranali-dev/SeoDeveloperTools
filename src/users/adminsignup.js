const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const { customAlphabet: generate } = require("nanoid");

const { generateJwt } = require("./helpers/generateJwt");
const User = require("./AdminModel");
const cookie = require('cookie');
const options = {
  expiresIn: "1h",
};
const sendMails = require("./helpers/AdminRigeter");

const CHARACTER_SET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const REFERRAL_CODE_LENGTH = 8;

const referralCode = generate(CHARACTER_SET, REFERRAL_CODE_LENGTH);
//Validate user schema
const cron = require('node-cron');

// Define a cron job to run every 30 seconds
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  referrer: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);

    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    var user = await User.findOne({
      email: result.value.email,
    });

    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    const hash = await User.hashPassword(result.value.password);

    const id = uuid(); // Generate unique id for the user.
    result.value.userId = id;
    const { firstName, lastName } = result.value;
    result.value.firstName = firstName; // Save first name
    result.value.lastName = lastName;   // Save last name

    delete result.value.confirmPassword;
    result.value.password = hash;

    let code = Math.floor(100000 + Math.random() * 900000);
    let expiry = Date.now() + 60 * 1000 * 15; // 15 mins in ms

    const sendCode = await sendMails(result.value.email, code); // Pass the verification code to the sendMail function
    console.log(sendCode)
    if (sendCode.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send verification email.",
      });
    }
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);
    // Check if referred and validate code.
    if (result.value.hasOwnProperty("referrer")) {
      let referrer = await User.findOne({
        referralCode: result.value.referrer,
      });
      if (!referrer) {
        return res.status(400).json({
          error: true,
          message: "Invalid referral code.",
        });
      }
    }
    let existingReferralUser = await User.findOne({
      referralCode: result.value.referralCode,
    });

    while (existingReferralUser) {
      result.value.referralCode = referralCode();
      existingReferralUser = await User.findOne({
        referralCode: result.value.referralCode,
      });
    }

    const newUser = new User(result.value);
    await newUser.save();
    cron.schedule('* * * * *', async () => {
        try {
          const inactiveUsers = await User.find({
            active: false,
            createdAt: { $lte: new Date(Date.now() - 100 * 1000) } // Adjust the time as needed
          });
  
          inactiveUsers.forEach(async (User) => {
            await User.findOneAndDelete({ _id: User._id });
            console.log(`Destroyed inactive account for ${User.email}`);
          });
        } catch (error) {
          console.error('Error in cron job:', error);
        }
      });
    return res.status(200).json({
      success: true,
      message: "Registration Success",
      referralCode: result.value.referralCode,
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
      details: error.message,
    });
  }
};
exports.Activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.json({
        error: true,
        status: 400,
        message: "Please make a valid request",
        
      });
    }
    const user = await User.findOne({
      emailToken: code,
      emailTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid details",
      });
    } else {
      if (user.active)
        return res.send({
          error: true,
          message: "Account already activated",
          status: 400,
        });

      user.emailToken = "";
      user.emailTokenExpires = null;
      user.active = true;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Account activated.",
      });
    }
  } catch (error) {
    console.error("activation-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
exports.Signup = async (req, res) => {
    try {
      const result = userSchema.validate(req.body);
  
      if (result.error) {
        console.log(result.error.message);
        return res.json({
          error: true,
          status: 400,
          message: result.error.message,
        });
      }
      var user = await User.findOne({
        email: result.value.email,
      });
  
      if (user) {
        return res.json({
          error: true,
          message: "Email is already in use",
        });
      }
      const hash = await User.hashPassword(result.value.password);
  
      const id = uuid(); // Generate unique id for the user.
      result.value.userId = id;
      const { firstName, lastName } = result.value;
      result.value.firstName = firstName; // Save first name
      result.value.lastName = lastName;   // Save last name
      delete result.value.confirmPassword;
      result.value.password = hash;
      let code = Math.floor(100000 + Math.random() * 900000);
      let expiry = Date.now() + 60 * 1000 * 15; // 15 mins in ms
  
      const sendCode = await sendMails(result.value.email, code); // Pass the verification code to the sendMail function
      console.log(sendCode)
      if (sendCode.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send verification email.",
        });
      }
      result.value.emailToken = code;
      result.value.emailTokenExpires = new Date(expiry);
      // Check if referred and validate code.
      if (result.value.hasOwnProperty("referrer")) {
        let referrer = await User.findOne({
          referralCode: result.value.referrer,
        });
        if (!referrer) {
          return res.status(400).json({
            error: true,
            message: "Invalid referral code.",
          });
        }
      }
      let existingReferralUser = await User.findOne({
        referralCode: result.value.referralCode,
      });
  
      while (existingReferralUser) {
        result.value.referralCode = referralCode();
        existingReferralUser = await User.findOne({
          referralCode: result.value.referralCode,
        });
      }
      const newUser = new User(result.value);
      await newUser.save();
      res.redirect(`/admin/admin/activete`);

    } catch (error) {
      console.error("signup-error", error);
      return res.status(500).json({
        error: true,
        message: "Cannot Register",
        details: error.message,
      });
    }
  };
  exports.Activate = async (req, res) => {
    try {
      const { email, code } = req.body;
      if (!email || !code) {
        return res.json({
          error: true,
          status: 400,
          message: "Please make a valid request",
          
        });
      }
      const user = await User.findOne({
        emailToken: code,
        emailTokenExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "Invalid details",
        });
      } else {
        if (user.active)
          return res.send({
            error: true,
            message: "Account already activated",
            status: 400,
          });
  
        user.emailToken = "";
        user.emailTokenExpires = null;
        user.active = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Account activated.",
        });
      }
    } catch (error) {
      console.error("activation-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: "Cannot authorize user.",
        });
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "Account not found",
        });
      }
      if (!user.active) {
        return res.status(400).json({
          error: true,
          message: "You must verify your email to activate your account",
        });
      }
      const isValid = await User.comparePasswords(password, user.password);
  
      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: "Invalid credentials",
        });
      }
      const { error, token } = await generateJwt(user.email, user.userId);
      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access token. Please try again later",
        });
      }
      user.accessToken = token;
      await user.save();
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('authToken', token, {
          httpOnly: true,
          maxAge: 3600, // Set the expiration time for the cookie (in seconds)
          sameSite: 'strict',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        })
      );
      res.redirect(
        `/admin/collection-ensureIndex/kira-yagami-082561-lira-Integrate-page-of-admin-931249/success`
      );
    } catch (err) {
      console.error("Login error", err);
      return res.status(500).json({
        error: true,
        message: "Couldn't login. Please try again later.",
      });
    }
  };
  
  exports.Logout = async (req, res) => {
    try {
      const { id } = req.decoded;
  
      let user = await User.findOne({ userId: id });
  
      user.accessToken = "";
  
      await user.save();
  
      return res.send({ success: true, message: "User Logged out" });
    } catch (error) {
      console.error("user-logout-error", error);
      return res.stat(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  exports.Allusers = async (req, res)=> {
    
    
      res.render('activete');

  }