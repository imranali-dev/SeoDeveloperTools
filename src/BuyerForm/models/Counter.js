// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence: { type: Number, required: true, default: 0, unique: true }
});

module.exports = mongoose.model('Counter', counterSchema);
