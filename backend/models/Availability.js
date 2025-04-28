const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  timeSlots: [String]
});

module.exports = mongoose.model('Availability', availabilitySchema);