const Payment = require("../Model/schma");
const sendMail = require("../middlewares/mailsending");

const generatePDF = (formData) => {
  const PDFDocument = require('pdfkit');
  const fs = require('fs');
  const path = require('path');

  const directory = 'invoices';
  const filePath = path.join(directory, `invoice_${formData._id}.pdf`);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  try {
    const doc = new PDFDocument();
    const filePath = `invoices/invoice_${formData._id}.pdf`; // Assuming _id is a unique identifier in your schema
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Add content to the PDF using formData
    doc.text(`Name: ${formData.firstName} ${formData.lastName}`);
    doc.text(`Username: ${formData.userName}`);
    doc.text(`Email: ${formData.email}`);
    doc.text(`Account Type: ${formData.accountType}`);
    doc.text(`Account Price: ${formData.accountPrice}`);
    doc.text(`Account Serial No: ${formData.accountSerialNo}`);
    doc.text(`Unique Pin: ${formData.uniquePin}`);
    doc.text(`Seller Email: ${formData.sellerEmail}`);
    doc.text(`Transaction ID: ${formData.transitionId}`);
    doc.text(`Transaction Data: ${formData.transitionData}`);
    doc.text(`Transaction Date: ${formData.transactionDate}`);
    doc.text(`Transaction Time: ${formData.transactionTime}`);

    doc.end();

    return filePath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Error generating PDF");
  }
};



exports.createPayment = async (req, res) => {

  try {
    const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'accountType', 'accountPrice'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${field} is required in the request body`
        });
      }
    }
    if (req.file) {
      req.body.paymentScreenshot = req.file.filename;
    }

    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    const pdfFilePath = await generatePDF(savedPayment);
    const selectedFields = {
      firstName: savedPayment.firstName,
      lastName: savedPayment.lastName,

      uniquePin: savedPayment.uniquePin,
      email: savedPayment.email,
      sellerEmail: savedPayment.sellerEmail,
      accountSerialNo: savedPayment.accountSerialNo,
      accountType: savedPayment.accountType,
      accountPrice: savedPayment.accountPrice,
      accountTax: savedPayment.accountTax,
      totalAccountPrice: savedPayment.totalAccountPrice,

      paymentScreenshot: savedPayment.paymentScreenshot,
      transitionId: savedPayment.transitionId,
      transitionData: savedPayment.sellerEmail,
      transactionDate: savedPayment.transitionId,
      transactionTime: savedPayment.transactionTime

    };
    const userEmail = savedPayment.email;
    const sellerEmail = savedPayment.sellerEmail;
    const { userResult, sellerResult } = await sendMail(selectedFields, pdfFilePath);

    res.status(201).json({
      message: 'Payment created successfully',
      data: savedPayment,
      pdfFilePath: pdfFilePath,
      emailResults: { userResult, sellerResult },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({
      message: 'An error occurred while creating the payment',
      error: error.message
    });
  }
};




exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      message: 'All payment details retrieved successfully',
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving payment details',
      error: error.message
    });
  }
};



exports.getUserData = async (req, res) => {
  try {
    const { id, email, sellerEmail, transitionId } = req.query;

    let query = {};

    if (id) {
      query._id = id;
    } else if (email) {
      query.email = email;
    } else if (sellerEmail) {
      query.sellerEmail = sellerEmail;
    } else if (transitionId) {
      query.transitionId = transitionId;
    } else {
      return res.status(400).json({
        message: 'Please provide a valid identifier (id, email, sellerEmail, transitionId)'
      });
    }

    const user = await Payment.findOne(query);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json({
      message: 'User data retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving user data',
      error: error.message
    });
  }
};




exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndRemove(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      message: 'Payment deleted successfully',
      data: deletedPayment
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the payment',
      error: error.message
    });
  }
};



exports.deletePaymentByEmail = async (req, res) => {
  try {
    const deletedPayment = await Payment.findOneAndRemove({ email: req.params.email });

    if (!deletedPayment) {
      return res.status(404).json({
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      message: 'Payment deleted successfully',
      data: deletedPayment
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the payment',
      error: error.message
    });
  }
};

exports.renderDeletePage = (req, res) => {
  res.render('deletePayementuser');
};

exports.renderUserPage = async (req, res) => {
  try {
    const users = await Payment.find();

    res.render('userPage', { users });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while rendering user page',
      error: error.message
    });
  }
};

