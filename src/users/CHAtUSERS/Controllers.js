// controllers/chatUserController.js

const ChatAppusers = require("./schma");

const readAllChatUsers = async (req, res) => {
  try {
    const users = await ChatAppusers.User.find()
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const displayUsers = async (req, res) => {
  try {
    const users = await ChatAppusers.User.find().populate('conversations');; // Fetch users from the database

    res.render('Chatusers', { users }); // Render the users.ejs file and pass the users data
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Display all accounts
const displayAllAccounts = async (req, res) => {
  try {
    const accounts = await ChatAppusers.Account.find();
    res.render('accounts', { accounts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Display all conversations
const displayAllConversations = async (req, res) => {
  try {
    const conversations = await ChatAppusers.Conversation.find();
    res.render('conversations', { conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Display all messages
const displayAllMessages = async (req, res) => {
  try {
    const messages = await ChatAppusers.Message.find();
    res.render('messages', { messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  readAllChatUsers,
  displayAllAccounts,
  displayUsers,
  displayAllConversations,
  displayAllMessages
};