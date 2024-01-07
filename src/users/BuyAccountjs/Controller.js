// const BuyandsellSchma = require("./schema");
const BuyandsellSchma = require("./scehma");
const express = require('express')
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

exports.createDetails = async (req, res) => {
  try {
    console.log('Received request to create new details');
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
