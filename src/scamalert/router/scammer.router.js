const express = require('express');
const router = express.Router();
const { createScammer, getScammers, getScammer, deleteScammer,getScammersPage, deleteScammerAndRender, updateScammer, updatedscammmerformRender } = require('../contrller/scammercontrllor'); 
router.post('/scammers', createScammer);
router.get('/scammers', getScammers);
router.get('/scammers/:id', getScammer);
router.delete('/scammers/:id', deleteScammer);
router.get('/scammersPage', getScammersPage);
router.get('/scammers/delete/page', deleteScammerAndRender);
router.put('/scammers/:id', updateScammer);
router.get('/scammers/Update/page', updatedscammmerformRender);

module.exports = router;
