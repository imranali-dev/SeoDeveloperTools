// const BuyandsellSchma = require("./schema");
const BuyandsellSchma = require("./scehma");
const express = require('express')
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
// const multer = require('multer')
// const storage = require('../../../Storage').upload;get

// const fields = [
//   { name: 'performanceOverviewimg', dest: 'uploads/performanceOverviewimg' },
//   { name: 'moreDetailsimg', dest: 'uploads/moreDetailsimg' },
//   { name: 'monthlyrevenueimg', dest: 'uploads/monthlyrevenueimg' },
//   { name: 'accountAnalyticsimg', dest: 'uploads/accountAnalyticsimg' },
//   { name: 'googleAnalyticsimg', dest: 'uploads/googleAnalyticsimg' },
// ];
// const upload = multer({ storage, fields });

// exports.createDetails = async (req, res) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: err.message });
//       }
//       const imagePath = req.file ? req.file.path : null;

//       const newDetails = new BuyandsellSchma({
//         accountFullname,
//         DescFull,
//         siteAge,
//         monthlyProfit,
//         profitMargin,
//         pageViews,
//         profitMultiple,
//         revenueMultiple,
//         moreDetailsimg: req.body.moreDetailsimg,
//         moreDetailsDetails: req.body.moreDetailsDetails,
//         monthlyrevenueimg: req.body.monthlyrevenueimg,
//         monthlyrevenueDetails: req.body.monthlyrevenueDetails,
//         accountAnalyticsimg: req.body.accountAnalyticsimg,
//         accountAnalyticsDetails: req.body.accountAnalyticsDetails,
//         googleAnalyticsimg: req.body.googleAnalyticsimg,
//         googleAnalyticsDetails: req.body.googleAnalyticsDetails,
//         performanceOverviewimg: imagePath,
//       });

//       const savedDetails = await newDetails.save();
//       res.status(201).json(savedDetails);
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.createDetails = async (req, res) => {
  try {
    console.log('Received request to create new details');
    // if (!req.body.accountFullname || !req.body.DescFull || !req.body.siteAge || !req.body.monthlyProfit || !req.body.profitMargin || !req.body.pageViews || !req.body.profitMultiple || !req.body.revenueMultiple || !req.body.performanceOverviewimg || !req.body.moreDetailsimg || !req.body.monthlyrevenueimg || !req.body.accountAnalyticsimg || !req.body.googleAnalyticsimg) {
    //   throw new Error('Missing required fields');
    // }

    console.log('Required fields present, creating new details object');

    const newDetails = new BuyandsellSchma({
      accountFullname: req.body.accountFullname,
      descFull: req.body.descFull,
      siteAge: req.body.siteAge,
      monthlyProfit: req.body.monthlyProfit,
      profitMargin: req.body.profitMargin,
      pageViews: req.body.pageViews,
      profitMultiple: req.body.profitMultiple,
      revenueMultiple: req.body.revenueMultiple,
      performanceOverviewimg: req.body.performanceOverviewimg,
      moreDetailsimg: req.body.moreDetailsimg,
      monthlyrevenueimg: req.body.monthlyrevenueimg,
      accountAnalyticsimg: req.body.accountAnalyticsimg,
      googleAnalyticsimg: req.body.googleAnalyticsimg,
      moreDetailsDetails: req.body.moreDetailsDetails,
      monthlyrevenueDetails: req.body.monthlyrevenueDetails,
      accountAnalyticsDetails: req.body.accountAnalyticsDetails,
      googleAnalyticsDetails: req.body.googleAnalyticsDetails,
      performanceOverviewDetails: req.body.performanceOverviewDetails
    });

    console.log('New details object created, saving to database');

    const savedDetails = await newDetails.save();
    res.status(201).json(savedDetails);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation error:', err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error('Unexpected error:', err);
      res.status(500).json({ message: err.message });
    }
  }
};


// ----------------------------------------------------------
// exports.getAllDetailsForRendring = async (req, res) => {
//   try {
//     const allDetails = await BuyandsellSchma.find();
//     res.render('allDetails', { allDetails });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving all details');
//   }
// };
// i am not using right know just for later use 



// =================================
//   find method

// Controller function for retrieving all details
exports.getAllDetails = async (req, res) => {
  try {
    const allDetails = await BuyandsellSchma.find().sort({ createdAt: -1 });
    if (allDetails.length === 0) {
      res.status(404).json({ message: 'No details found' });
    } else {
      res.status(200).json(allDetails);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving all details' });
  }
};



// ============================================= uupdating


// controllers/detailsController.js
exports.updateDetailsById = async (req, res) => {
  const { id } = req.params; 
  const updateFields = req.body; 

  try {
    const updatedDetails = await BuyandsellSchma.findByIdAndUpdate(
      id,
      { $set: updateFields }, 
      { new: true } 
    );

    if (!updatedDetails) {
      return res.status(404).json({ message: 'Details not found' });
    }

    res.status(200).json(updatedDetails);
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') { 
      const validationErrors = [];

      for (const error of err.errors) {
        validationErrors.push({
          field: error.path,
          message: error.message,
        });
      }

      return res.status(400).json({ validationErrors });
    }

    res.status(500).json({ message: 'Error updating details' });
  }
};



exports.deleteDetailsById = async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedDetails = await BuyandsellSchma.findByIdAndRemove(id);

    if (!deletedDetails) {
      return res.status(404).json({ message: 'Details not found' });
    }

    res.status(200).json({ message: 'Details deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
