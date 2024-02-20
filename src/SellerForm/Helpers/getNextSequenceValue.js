const Counter = require("../SequenceNumbers/Sequnce");

async function getNextSequenceValue(counterName) {
    const counter = await Counter.findOneAndUpdate(
      { _id: counterName },
      { $inc: { sequence: 1 } },
      { new: true, upsert: true } // Ensure counter exists
    );
    return counter?.sequence; // Return sequence if counter exists, otherwise undefined
  }
  

module.exports = getNextSequenceValue;
