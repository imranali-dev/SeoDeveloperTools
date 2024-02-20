const SellerForm = require("../Models/sechma");

exports.createSellerForm = async (req, res) => {
    const { userInfo, accountDetails, BuyeruserName,eightDigitCode2, sellerFormMainBuyerGCFCode } = req.body;
    const newSellerForm = new SellerForm({
        userInfo,
        accountDetails,
        ...(eightDigitCode2 && { eightDigitCode2 }), // Set only if present
        sellerFormMainBuyerGCFCode,
        BuyeruserName
      });
    newSellerForm.save()
      .then(savedSellerForm => {
        res.status(201).json({
          success: true,
          message: 'Seller form successfully created!',
          data: savedSellerForm
        });
      })
      .catch(error => {
        console.error('Error creating seller form:', error);
        let errorMessage = 'Failed to create seller form. Please try again.';
        if (error.name === 'ValidationError') {
          errorMessage = 'Invalid input data. Please check your data and try again.';
        } else if (error.name === 'MongoError' && error.code === 11000) {
          errorMessage = 'Duplicate field value entered. Please check your data and try again.';
        }
        res.status(500).json({
          success: false,
          message: errorMessage,
          error: error.message
        });
      });
  };
  
  
exports.getAllSellerForms = async (req, res) => {
    try {
        const sellForms = await SellerForm.find();
        res.status(200).json(sellForms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sellForms' });
    }
};

exports.getSellerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const sellForm = await SellerForm.findOne({ 'userInfo.email': email });
        if (!sellForm) {
            return res.status(404).json({ message: 'sellForm not found' });
        }
        res.status(200).json(sellForm);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sellForm' });
    }
};

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
    
    res.render('sellerForms', { sellerForms: allSellerForms });
  } catch (error) {
    console.error('Error retrieving seller forms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve seller forms. Please try again.',
      error: error.message
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
  