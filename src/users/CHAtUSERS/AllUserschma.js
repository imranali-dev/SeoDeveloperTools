const mongoose = require('mongoose');

// Establish MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schemas

const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: { type: String, unique: true },
  image: String,
  hashedPassword: String,
  emailVerified: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  conversationIds: [{ type: mongoose.Schema.Types.ObjectId }],
  seenMessageIds: [{ type: mongoose.Schema.Types.ObjectId }],

  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const AccountSchema = new mongoose.Schema({
  _id: String,
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
  _id: String,
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now },
  name: String,
  isGroup: Boolean,

  messagesIds: [{ type: mongoose.Schema.Types.ObjectId }],
  userIds: [{ type: mongoose.Schema.Types.ObjectId }],
});

const MessageSchema = new mongoose.Schema({
  _id: String,
  body: String,
  image: String,
  createdAt: { type: Date, default: Date.now },

  seenIds: [{ type: mongoose.Schema.Types.ObjectId }],
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Create Mongoose models based on schemas
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { User, Account, Conversation, Message };
