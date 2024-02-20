const SellerForm = require("../Models/sechma");

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



  