const mongoose = require('mongoose');
require('dotenv').config();
const SMSDB = process.env.MONGO_SMS_URI;

// Function to establish connection
const createConnection = () => {
  return mongoose.createConnection(SMSDB, {
    dbName: "database",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const createModel = (connection) => {
  const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    image: String,
    hashedPassword: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    conversationIds: [{ type: mongoose.Schema.Types.ObjectId }],
    seenMessageIds: [{ type: mongoose.Schema.Types.ObjectId }],

    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
    seenMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  });
  const User = connection.model('User', UserSchema, 'User');

  const AccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
  });

  const ConversationSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    lastMessageAt: { type: Date, default: Date.now },
    name: String,
    isGroup: Boolean,

    messagesIds: [{ type: mongoose.Schema.Types.ObjectId }],
    userIds: [{ type: mongoose.Schema.Types.ObjectId }],
  });

  const MessageSchema = new mongoose.Schema({
    body: String,
    image: String,
    createdAt: { type: Date, default: Date.now },

    seenIds: [{ type: mongoose.Schema.Types.ObjectId }],
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  const Account = connection.model('Account', AccountSchema, 'Account');
  const Conversation = connection.model('Conversation', ConversationSchema, 'Conversation');
  const Message = connection.model('Message', MessageSchema, 'Message');

  return { User, Account, Conversation, Message };
};

module.exports = {
  createConnection,
  createModel
};
