const AdminUser = require("./AdminModel");
const sendMails = require("./helpers/AdminRigeter");
// const AdminUser = require("./models/AdminUser"); // Assuming this is your AdminUser model

function generateSecurityCode() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Generates a 6-digit code
}
class AdminUserkeys {
  static async generateCode(req, res) {
    const { email } = req.body;

    try {
      const securityCode = generateSecurityCode();
      const expirationTime = new Date(Date.now() + 2 * 60 * 1000); // Two minutes in milliseconds

      let user = await AdminUser.findOne({ email });

      if (!user) {
        user = await AdminUser.create({
          email,
          securityCode,
          securityCodeExpiresAt: expirationTime,
        });
      } else {
        user.securityCode = securityCode;
        user.securityCodeExpiresAt = expirationTime;
        await user.save();
      }
      await sendMails(email, securityCode);

      res.json({ status: "success", code: securityCode });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }
}

module.exports = AdminUserkeys;
