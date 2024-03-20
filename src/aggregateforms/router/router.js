const express = require("express");
const router = express.Router();
const { searchByParam } = require("../model/model");

router.get('/admin/admin/search/:searchParam', async (req, res) => {
    try {
        const searchParam = req.params.searchParam;
        const searchResults = await searchByParam(searchParam);
        res.status(200).json({ data: searchResults, success: true });
    } catch (error) {
        console.error('Error in admin search:', error.message);
        res.status(500).json({ error: 'Internal Server Error by router' });
    }
});
router.get('/admin/search/:searchParam', async (req, res) => {
    try {
        const searchParam = req.params.searchParam;
        const searchResults = await searchByParam(searchParam);
        res.render('aggregateformSearch', { searchResults });
    } catch (error) {
        console.error('Error in admin search:', error.message);
        res.status(500).json({ error: 'Internal Server Error by router' });
    }
});


router.get('/admin/searching', async (req, res) => {
    try {
        const results = await searchByParam.find();
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching BuyerForms' });
    }
    
});




router.get('/all-users', async (req, res) => {
    try {
        const allUsers = await searchByParam('');
    
        res.render('aggregatewithoutsearching', { users: allUsers }); // Render EJS template with users data
      } catch (error) {
        console.error('Error in all-users route:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
  });
  
module.exports = router;
