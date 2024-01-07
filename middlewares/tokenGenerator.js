const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

async function generateTokens(email) {
  try {
    const payload = { email: email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    throw new Error('Token generation failed');
  }
}

module.exports = { generateTokens };
