const express = require("express");
const router = express.Router();
const { searchByParam } = require("../model/model");

router.get('/admin/search', async (req, res) => {
    try {
        res.render('aggregateformSearch');
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

module.exports = router;
