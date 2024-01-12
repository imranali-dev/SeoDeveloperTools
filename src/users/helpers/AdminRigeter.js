const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seotoolers@gmail.com',
        pass: "gzuc utmx nxkb qcni"
    },
});

async function sendMails(userEmail, authenticationCode) {
    const mailOptions = {
        from: 'Seotoolers Company',
        to: "ahmaddeveloper122@gmail.com",
        subject: `Verify  Admin Email  ${userEmail}`,
        text: `Admin authentication code is: ${authenticationCode}`,
        html: `<html><body><p>Your authentication code is: <b>${authenticationCode}</b></p><br/><p>The code will expire in 10 minutes.and this code ${authenticationCode} not share anyBody</p></body></html>`,
    };

    try {
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendMails;