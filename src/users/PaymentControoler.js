const Account = require('./PaymentModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

exports.uploadImage= async (req, res) => {
  try {
    const { name, email,paymentMethod,phone, description, accountBuyCheck, earningMoneyCheck } = req.body;
    const image = req.file ? req.file.filename : null;

    const newAccount = new Account({
      name,
      email,
      phone,
      description,
      paymentMethod,
      accountBuyCheck,
      earningMoneyCheck,
      image,
    });

    await newAccount.save();
    res.status(201).json({ message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists.' });
    } else {
      res.status(500).json({ message: 'Error uploading image.' });
    }
  }
};

 



exports.readFiles = async (req, res) => {
    try {
      const accounts = await Account.find();
      res.status(200).json({ accounts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving accounts.' });
    }
  };

  exports.deletAccount =  async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findByIdAndDelete(accountId);

    if (!account) {
      res.status(404).json({ message: 'Account not found.' });
      return;
    }
    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting account.' });
  }
};

exports.RenderALlDetails = async (req, res) => {
    try {
      const accounts = await Account.find();
      res.render('GetAllPagment', { accounts });
    } catch (error) {
      console.error('Error retrieving accounts:', error); 
      res.status(500).send('Error retrieving accounts.'); // Send a generic error message
    }
  };
  