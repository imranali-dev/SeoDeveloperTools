const nodemailer = require('nodemailer');
const User = require('../user.model');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ia8214652@gmail.com',
        pass: "bxpm bdvc niwg nqwx"
    },
});

async function sendMail(userEmail, authenticationCode) {
    const mailOptions = {
        from: 'seotoolers.com Company',
        to: userEmail,
        subject: 'Verify your email',
        text: `Your authentication code is: ${authenticationCode}`,
        html: `<html><body><p>Your authentication code is: <b>${authenticationCode}</b></p><br/><p>The code will be expire in 10 minutes.</p></body></html>`,
    };

    try {
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error for better error handling in the calling code
    }
}

module.exports = sendMail;
