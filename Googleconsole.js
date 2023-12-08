const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '272210984295-ta1npi9t7v6ae5do8i60j3n700lbkinl.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04U5HGDJekP32CgYIARAAGAQSNwF-L9IrvA_Y8TGoaWpziIzSHGtbHhYiGmZrfoqzBm8LGdQztMAHlsEikjbZOqhrPDnXJ2y1bKI';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(authenticationCode) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'imraan.dev@proton.me',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'Imran Ali <imraan.dev@proton.me>', // Corrected email address
            to: 'imranalii.dev@outlook.com',
            subject: 'Verify your email',
            text: `Your authentication code is: ${authenticationCode}`,
            html: `<html><body><p>Your authentication code is: <b>${authenticationCode}</b></p></body></html>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error for better error handling in the calling code
    }
}

sendMail('Your authentication code') // Added a sample authentication code
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));

module.exports = sendMail;