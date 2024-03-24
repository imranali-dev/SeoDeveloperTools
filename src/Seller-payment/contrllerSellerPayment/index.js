const SellerPayment = require("../model/Model");
const { validationResult } = require('express-validator');
const sendMail = require("../middlewares/mailsending");

const DUPLICATE_KEY_ERROR_CODE = 11000;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST_ERROR = 400;
const fs = require('fs');
// const generatePDF = (formData) => {
//   const PDFDocument = require('pdfkit');
//   const fs = require('fs');
//   const path = require('path');

//   const directory = 'invoices';
//   const filePath = path.join(directory, `invoice_${formData._id}.pdf`);

//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory);
//   }
//   try {
//     const doc = new PDFDocument();
//     const filePath = `invoices/invoice_${formData._id}.pdf`; 
//     const stream = fs.createWriteStream(filePath);

//     doc.pipe(stream);
//     doc.text(`Name: ${formData.firstName} ${formData.lastName}`);
//     doc.text(`Username: ${formData.userName}`);
//     doc.text(`Email: ${formData.emailAddress}`);
//     doc.text(`Unique Pin Type: ${formData.uniquePin}`);
//     doc.text(`Account Serial No.: ${formData.accountSerialNo}`);
//     doc.text(`Account Type: ${formData.accountType}`);
//     doc.text(`Account Price: ${formData.accountPrice}`);
//     doc.text(`Account Tax: ${formData.accountTax}`);
//     doc.text(`Total Account Price: ${formData.totalAccountPrice}`);

//     doc.text(`Transaction ID: ${formData.transitionId}`);
//     doc.text(`Transaction Date: ${formData.transitionIdDate}`);

//     doc.text(`Payment Account Name: ${formData.paymentAccountName}`);
//     doc.text(`Payment Account Address: ${formData.paymentAccountAddress}`);
//     doc.text(`Payment Method: ${formData.selectPaymentMethod}`);

//     doc.text(`Buyer Code: ${formData.buyerCode}`); 
//     doc.text(`Seller Code: ${formData.sellerCode}`); 
//     doc.end();
//     return filePath;
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     throw new Error("Error generating PDF");
//   }
// };

exports.createPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_ERROR).json({ errors: errors.array() });
  }
  const {
    firstName,
    lastName,
    userName,
    uniquePin,
    emailAddress,
    sellerEmailAddress,
    accountSerialNo,
    accountType,
    accountPrice,
    accountTax,
    totalAccountPrice,
    transitionId,
    transitionIdDate,
    paymentAccountName,
    paymentAccountAddress,
    selectPaymentMethod,
    buyerCode,
    sellerCode,
    transitionScreenShot,
  } = req.body;
  try {
    const newSellerPayment = new SellerPayment({
      firstName,
      lastName,
      userName,
      uniquePin,
      emailAddress,
      sellerEmailAddress,
      accountSerialNo,
      accountType,
      accountPrice,
      accountTax,
      totalAccountPrice,
      transitionId,
      transitionIdDate,
      paymentAccountName,
      paymentAccountAddress,
      selectPaymentMethod,
      buyerCode,
      sellerCode,
      transitionScreenShot,
    });
    const savedSellerPayment = await newSellerPayment.save();
    const selectedFields = {
      firstName: savedSellerPayment.firstName,
      lastName: savedSellerPayment.lastName,
      userName:savedSellerPayment.userName,
      uniquePin:savedSellerPayment.uniquePin,
      emailAddress:savedSellerPayment.emailAddress,
      sellerEmailAddress:savedSellerPayment.sellerEmailAddress,
      accountSerialNo:savedSellerPayment.accountSerialNo,
      accountType:savedSellerPayment.accountType,
      accountPrice:savedSellerPayment.accountPrice,
      accountTax:savedSellerPayment.accountTax,
      totalAccountPrice:savedSellerPayment.totalAccountPrice,
      transitionId:savedSellerPayment.transitionId,
      transitionIdDate:savedSellerPayment.transitionIdDate,
      paymentAccountName:savedSellerPayment.paymentAccountName,
      paymentAccountAddress:savedSellerPayment.paymentAccountAddress,
      selectPaymentMethod:savedSellerPayment.selectPaymentMethod,
      selectPaymentMethod:savedSellerPayment.selectPaymentMethod,
      sellerCode:savedSellerPayment.sellerCode,
      transitionScreenShot:savedSellerPayment.transitionScreenShot,
    };
    const userEmail = savedSellerPayment.emailAddress;
    const sellerEmail = savedSellerPayment.sellerEmailAddress;
    // const { userResult, sellerResult } = await sendMail(selectedFields);

    // if (!userResult.success || !sellerResult.success) {
    //   try {
    //     console.error('Error sending email(s).');
    //   } catch (error) {
    //     console.error('Error deleting PDF file:', error);
    //   }
    // }

    return res.status(201).json({ savedSellerPayment });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).json({ message: error.message }); // Provide validation error details
    } else if (error.name === 'MongoError' && error.code === DUPLICATE_KEY_ERROR_CODE) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(BAD_REQUEST_ERROR).json({ message: `Duplicate key error for field: ${duplicateField}` });
    } else {
      console.error(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
};



exports.deleteUserByEmail = async (req, res) => {
  const { emailAddress } = req.params;
  if (!emailAddress || !isValidEmailAddress(emailAddress)) {
    return res.status(400).json({ message: 'Invalid email address provided' });
  }

  try {
    const deletedUser = await SellerPayment.deleteOne({ emailAddress });
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

function isValidEmailAddress(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}




exports.getAllPayments = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_ERROR).json({ errors: errors.array() });
  }

  try {
    const allPayments = await SellerPayment.find();
    return res.status(200).json(allPayments);

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).json({ message: error.message });
    } else if (error.name === 'MongoError' && error.code === DUPLICATE_KEY_ERROR_CODE) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(BAD_REQUEST_ERROR).json({ message: `Duplicate key error for field: ${duplicateField}` });
    } else {
      console.error(error);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
};
exports.getAllPaymentsPages = async (req, res) => {
  const payments = await SellerPayment.find()
  //   .sort({ createdAt: 'desc' }); // Example sorting

  res.render('SellerpaymentsDetails', { payments });
};



exports.renderDeletePage = (req, res) => {
  res.render('SellerpaymentsDelete');
};


exports.renderHomePage = (req, res) => {
  res.render('SellerpaymentsHomePage');
};
