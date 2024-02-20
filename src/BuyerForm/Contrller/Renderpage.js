const BuyerForm = require("../db/sechma");
exports.getAllBuyerFormsRen = async (req, res) => {
    try {
      const allSellerForms = await BuyerForm.find({});
      
      res.render('buyerForms', { sellerForms: allSellerForms });
    } catch (error) {
      console.error('Error retrieving seller forms:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve seller forms. Please try again.',
        error: error.message
      });
    }
  };



  