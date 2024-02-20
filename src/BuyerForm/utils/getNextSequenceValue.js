const Counter = require("../models/Counter");

async function getNextSequenceValue(counterName) {
    const counter = await Counter.findOneAndUpdate(
        { _id: counterName },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true } // Ensure counter exists
    );
    return counter.sequence;
}

module.exports = getNextSequenceValue;
