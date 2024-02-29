const SellerForm = require("../Models/sechma");


const { validationResult } = require('express-validator');

exports.createSellerForm = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error. Please check your input.',
        validationErrors: validationErrors.array(),
      });
    }

    const {
      userInfo,
      accountDetails,
      sellerFormMainBuyerGCFCode,
    } = req.body;

    const sellerForm = new SellerForm({
      userInfo,
      accountDetails,
      sellerFormMainBuyerGCFCode,
    });

    await sellerForm.save();

    res.status(201).json({
      success: true,
      message: 'SellerForm created successfully!',
      data: sellerForm,
    });
  } catch (error) {
    console.error('Error creating SellerForm:', error);

    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Validation error. Please check your input.',
        validationErrors: Object.values(error.errors).map((err) => err.message),
      });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      const duplicatedValue = error.keyValue[duplicatedField];

      res.status(400).json({
        success: false,
        error: `Duplicate key error. The value '${duplicatedValue}' for field '${duplicatedField}' is not unique.`,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create SellerForm. Please try again later.',
      });
    }
  }
};

  
  
exports.getAllSellerForms = async (req, res) => {
    try {
        const sellForms = await SellerForm.find();
        res.status(200).json({
          success: true,
          dara:sellForms
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sellForms' });
    }
};

exports.getSellers = async (req, rep) => {
  try {
    const sellForms = await SellerForm.find();
    rep.status(200).json({
      success: true,
      data: sellForms
    });
  } catch (error) {
   
      console.error('Error fetching sellForms:', error);
      rep.status(500).json({ error: 'Error fetching sellForms' });
    }
    
}

// exports.getSellerFormByEmail = async (req, res) => {
//     const { email } = req.params;
//     try {
//         const sellForm = await SellerForm.findOne({ 'userInfo.email': email });
//         if (!sellForm) {
//             return res.status(404).json({ message: 'sellForm not found' });
//         }
//         res.status(200).json(sellForm);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching sellForm' });
//     }
// };

exports.deleteSellerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedForm = await SellerForm.findOneAndDelete({ 'userInfo.email': email });
        if (!deletedForm) {
            return res.status(404).json({ message: 'sellForm not found' });
        }
        res.status(200).json({ message: 'sellForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting sellForm' });
    }
};

exports.deleteSellerFormByCode = async (req, res) => {
    const { eightDigitCode } = req.params;
    try {
        const deletedForm = await SellerForm.findOneAndDelete({ eightDigitCode });
        if (!deletedForm) {
            return res.status(404).json({ message: 'sellForm not found' });
        }
        res.status(200).json({ message: 'sellForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting sellForm' });
    }
};

exports.getAllSellerFormsRen = async (req, res) => {
  try {
    const allSellerForms = await SellerForm.find({});
    res.render('sellerForms', { sellerForms: allSellerForms, selectedRowIndex: -1 });
  } catch (error) {
    console.error('Error retrieving seller forms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve seller forms. Please try again.',
      error: error.message,
      selectedRowIndex: -1  // Add this line
    });
  }
};



exports.deleteSellerForm = async (req, res) => {
    const { email, accountId } = req.body;
    try {
      const deletedSellerForm = await SellerForm.findOneAndDelete({
        $or: [
          { 'userInfo.email': email },
          { 'accountDetails.accountId': accountId }
        ]
      });
  
      if (!deletedSellerForm) {
        return res.status(404).json({
          success: false,
          message: 'No seller form found with the provided email or account ID.'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Seller form successfully deleted!',
        data: deletedSellerForm
      });
    } catch (error) {
      console.error('Error deleting seller form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete seller form. Please try again.',
        error: error.message
      });
    }
  };
  