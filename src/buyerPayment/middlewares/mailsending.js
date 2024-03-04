const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ia8214652@gmail.com',
    pass: "bxpm bdvc niwg nqwx"
  },
});

async function sendMail(selectedFields, pdfFilePath) {
  const userEmailAddress = selectedFields.email;
  const sellerEmailAddress = selectedFields.sellerEmail;

  if (!userEmailAddress) {
    throw new Error('Missing user email address');
  }

  if (!sellerEmailAddress) {
    throw new Error('Missing seller email address');
  }

  const commonMailOptions = {
    from: 'seotoolers.com Company',
    attachments: [
      {
        filename: 'invoice.pdf',
        path: pdfFilePath,
        encoding: 'base64',
      },
    ],
  };

  const userMailOptions = {
    ...commonMailOptions, 
    to: userEmailAddress,
    subject: 'Transition Details for Seller Payment',
    html: buildUserEmailContent(selectedFields),
  };

  const sellerMailOptions = {
    ...commonMailOptions, 
    to: sellerEmailAddress,
    cc:"seotoolers@gmail.com",
    subject: 'Verify your email',
    html: buildSellerEmailContent(selectedFields),
  };

  try {
    await transport.sendMail(userMailOptions);
    await transport.sendMail(sellerMailOptions);
    return { userResult: { success: true }, sellerResult: { success: true } };
  } catch (error) {
    console.error('Error sending email:', error);
    // agr koi eror aye to yahan pr console log kry gy ya phir 
    // more error dy gy
    return { error: 'Error sending email' };
  }
}

function buildUserEmailContent(data) {
  return `
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      Hi ${data.firstName} ${data.lastName},
    </p>

    <p>This email contains the details of your recent transaction on seotoolers.com.</p>
    <table style="border-collapse: collapse; width: 100%; background-color: #f5f5f5;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold; justify-content:center;">Field</th>
          <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold; justify-content:center;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data)
          .filter(
            ([key]) =>
              key !== 'sellerEmail' && key !== 'password' // Exclude specific fields
          )
          .map(([key, value]) => (
            `<tr>
              <td class="table-cell" data-label="${key}" style="border: 1px solid #ddd; padding: 5px; justify-content:center; white-space: nowrap;">${key}</td>
              <td class="table-cell" data-label="${key}" style="border: 1px solid #ddd; padding: 5px; justify-content:center; white-space: nowrap;">${value}</td>
            </tr>`
          ))}
      </tbody>
    </table>
  `;
}
function buildSellerEmailContent(data) {
  return `
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      Hi ${data.sellerEmail},
    </p>

    <p>You have received a payment from ${data.firstName} ${data.lastName} on seotoolers.com.</p>
    <table style="border-collapse: collapse; width: 100%; background-color: #f5f5f5;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Field</th>
          <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data)
          .filter(
            ([key]) =>
              key !== 'email' && key !== 'password' && key !== 'sellerEmail' // Exclude specific fields
          )
          .map(([key, value]) => (
            `<tr>
              <td class="table-cell" data-label="${key}" style="border: 1px solid #ddd; padding: 5px; white-space: nowrap;">${key}</td>
              <td class="table-cell" data-label="${key}" style="border: 1px solid #ddd; padding: 5px; white-space: nowrap;">${value}</td>
            </tr>`
          ))}
      </tbody>
    </table>
  `;
}

module.exports = sendMail;
