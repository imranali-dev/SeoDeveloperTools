const express = require('express');
const { createDetails, getAllDetails, updateDetailsById, deleteDetailsById } = require('../src/users/BuyAccountjs/Controller');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// POST route for creating new details
router.post('/create_details_buy_accountsss', authenticateToken,createDetails);
// GET route to render the createDetails EJS form
router.get('/create_details_buy_accounts', authenticateToken,(req, res) => {
    res.render('CreateBuyAccounts'); // Render the EJS file for creating new details
});
// GET route for retrieving all details
router.get('/details_buy_accounts',getAllDetails);
// PUT route for updating details by ID
router.put('/update_buyaccounts/:id', authenticateToken,updateDetailsById);
router.get('/update_buyaccounts', authenticateToken,(req, res) => {
    res.render('UpdateBuyAccounts');
});

// DELETE route for deleting details by ID
router.delete('/delete_BuyAccounts/:id', authenticateToken,deleteDetailsById);
router.get('/delete_buyaccounts', authenticateToken,(req, res) => {
    res.render('DeleteBuyAccounts');
});

router.get('/', authenticateToken,(req, res) => {
    res.render('welcomBuyAccounts');
});
module.exports = router;