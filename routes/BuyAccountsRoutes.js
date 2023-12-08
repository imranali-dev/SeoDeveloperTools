const express = require('express');
const { createDetails, getAllDetails, updateDetailsById, deleteDetailsById } = require('../src/users/BuyAccountjs/Controller');
const router = express.Router();

// POST route for creating new details
router.post('/create_details_buy_accountsss', createDetails);
// GET route to render the createDetails EJS form
router.get('/create_details_buy_accounts', (req, res) => {
    res.render('CreateBuyAccounts'); // Render the EJS file for creating new details
});
// GET route for retrieving all details
router.get('/details_buy_accounts', getAllDetails);

// PUT route for updating details by ID
router.put('/update_buyaccounts/:id', updateDetailsById);
router.get('/update_buyaccounts', (req, res) => {
    res.render('UpdateBuyAccounts');
});

// DELETE route for deleting details by ID
router.delete('/delete_BuyAccounts/:id', deleteDetailsById);
router.get('/delete_buyaccounts', (req, res) => {
    res.render('DeleteBuyAccounts'); // ??Render the EJS file for creating new details
});

router.get('/', (req, res) => {
    res.render('welcomBuyAccounts');
});
module.exports = router;


