// routes/chatUsers.js
const express = require('express');
const router = express.Router();
const { readAllChatUsers, displayUsers, displayAllAccounts, displayAllConversations, displayAllMessages } = require('../src/users/CHAtUSERS/Controllers');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/chatusers',authenticateToken, readAllChatUsers);
router.get("/Chats", authenticateToken, displayUsers);
router.get('/accounts',authenticateToken,  displayAllAccounts);
router.get('/conversations', authenticateToken, displayAllConversations);
router.get('/messages', authenticateToken, displayAllMessages);
module.exports = router;
