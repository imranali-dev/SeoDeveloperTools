const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ia8214652@gmail.com',
    pass: "bxpm bdvc niwg nqwx"
  },
});

async function sendMail(sellerPayment, pdfFilePath) {
  const userEmailAddress = sellerPayment.emailAddress;
  const sellerEmailAddress = sellerPayment.sellerEmailAddress;
  if (!userEmailAddress) {
    throw new Error('Missing user email address');
  }

  if (!sellerEmailAddress) {
    throw new Error('Missing seller email address');
  }

  const userMailOptions = {
    from: 'seotoolers.com Company',
    to: userEmailAddress, 

    subject: 'Transition Details for Seller Payment',
    html: `
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    Hi ${sellerPayment.firstName} ${sellerPayment.lastName},
</p>

      <p>This email contains the details of your recent transaction on seotoolers.com.</p>
      <table style="border-collapse: collapse; width: 100%; background-color: #f5f5f5;">
          <thead>
              <tr>
                  <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Field</th>
                  <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Value</th>
              </tr>
          </thead>
          <tbody>
              ${Object.entries(sellerPayment).map(([key, value]) => (
      `<tr>
                      <td  style="border: 1px solid black; padding: 5px; white-space: nowrap;">${key}</td>
                      <td style="border: 1px solid black; padding: 5px; white-space: nowrap;">${value}</td>
                  </tr>`
    ))}
          </tbody>
      </table>
  `,
    attachments: [
      {
        filename: 'invoice.pdf',
        path: pdfFilePath,
        encoding: 'base64',
      },
    ],
  };



  const sellerMailOptions = {
    from: 'seotoolers.com Company',
    to: sellerEmailAddress, 
    subject: 'Verify your email',
    html: `
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
  Hi ${sellerPayment.firstName} ${sellerPayment.lastName},
</p>

    <p>This email contains the details of your recent transaction on seotoolers.com.</p>
    <table style="border-collapse: collapse; width: 100%; background-color: #f5f5f5;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Field</th>
                <th style="border: 1px solid #ddd; padding: 5px; background-color: #eee; font-weight: bold;">Value</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(sellerPayment).map(([key, value]) => (
      `<tr>
                    <td style="border: 1px solid black; padding: 5px;">${key}</td>
                    <td style="border: 1px solid black; padding: 5px;">${value}</td>
                </tr>`
    ))}
        </tbody>
    </table>
`,
  };

  try {


    await transport.sendMail(userMailOptions);
    await transport.sendMail(sellerMailOptions);
    return { userResult: { success: true }, sellerResult: { success: true } };
  } catch (error) {
    console.error('Error sending email:', error);
    // Handle email errors appropriately (e.g., log details, retry sending,
    // return an error object with details)
// agr aur error aaty hain to yahan sy start krna aur console .log kr ky debuginh krna
    return { error: 'Error sending email' };
  }
}

module.exports = sendMail;
