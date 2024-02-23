const BuyerForm = require("../db/sechma");


exports.getAllBuyerFormsRen = async (req, res) => {
  try {
    const buyerForms = await BuyerForm.find({});
    res.render('buyerForms', { buyerForms, selectedRowIndex: -1 });  // Pass selectedRowIndex to the template
  } catch (error) {
    console.error('Error retrieving buyer forms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve buyer forms. Please try again.',
      error: error.message
    });
  }
};





  