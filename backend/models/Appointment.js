const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  time: String,
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
