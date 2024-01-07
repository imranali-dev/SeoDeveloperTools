const { createConnection, createModel } = require('./config');

// Establish connection
const connection = createConnection();

// Create model from the established connection
const ChatAppusers = createModel(connection);

module.exports = ChatAppusers;

