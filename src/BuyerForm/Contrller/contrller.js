const BuyerForm = require("../db/sechma");


exports.createBuyerForm = async (req, res) => {
    try {
      const {
        email,
        userName,
        sellerUserName,
        totalAccountTypeAvailable,
        totalAccountIdAvailable,
        eightDigitCodeRandom,
        accountId,
      } = req.body;
  
      const buyerForm = new BuyerForm({
        userInfo: {
          email,
          userName,
        },
        sellerUserName,
        totalAccountTypeAvailable,
        totalAccountIdAvailable,
        eightDigitCodeRandom,
        accountId,
      });
  
      await buyerForm.save();
  
      res.status(201).json({
        success: true,
        message: 'BuyerForm created successfully!',
        data: buyerForm,
      });
    } catch (error) {
      console.error('Error creating BuyerForm:', error);
  
      if (error.name === 'ValidationError') {
        // Mongoose validation error (e.g., required field missing or validation failed)
        const validationErrors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({
          success: false,
          error: 'Validation error. Please check your input.',
          validationErrors,
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
          error: 'Failed to create BuyerForm. Please try again later.',
        });
      }
    }
  };
  

exports.getAllBuyerForms = async (req, res) => {
    try {
        const buyerForms = await BuyerForm.find();
        res.status(200).json(buyerForms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching BuyerForms' });
    }
};
exports.getBuyerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const buyerForm = await BuyerForm.findOne({ 'userInfo.email': email });
        if (!buyerForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json(buyerForm);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching BuyerForm' });
    }
};

exports.deleteBuyerFormByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedForm = await BuyerForm.findOneAndDelete({ 'userInfo.email': email });
        if (!deletedForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json({ message: 'BuyerForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting BuyerForm' });
    }
};
exports.deleteBuyerFormByCode = async (req, res) => {
    const { eightDigitCode } = req.params;
    try {
        const deletedForm = await BuyerForm.findOneAndDelete({ eightDigitCode });
        if (!deletedForm) {
            return res.status(404).json({ message: 'BuyerForm not found' });
        }
        res.status(200).json({ message: 'BuyerForm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting BuyerForm' });
    }
};
exports.deleteBuyerForm = async (req, res) => {
    const { email, accountId } = req.body;
    try {
      const deletedBuyerForm = await BuyerForm.findOneAndDelete({
        $or: [
          { 'userInfo.email': email },
          { 'accountDetails.accountId': accountId }
        ]
      });
  
      if (!deletedBuyerForm) {
        return res.status(404).json({
          success: false,
          message: 'No seller form found with the provided email or account ID.'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Seller form successfully deleted!',
        data: deletedBuyerForm
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