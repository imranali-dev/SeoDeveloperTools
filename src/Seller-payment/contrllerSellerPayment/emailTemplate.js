const pug = require('pug');

function generateEmailContent(formValues) {
    const htmlContent = pug.renderFile('./payment_confirmation_email.pug', formValues);
    return htmlContent;
}

module.exports = generateEmailContent;
