const express = require('express');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');
const router = express.Router();
const auth = require('../utils/authMiddleware');

// Student books an appointment
router.post('/', auth('student'), async (req, res) => {
  try {
    const { professorId, date, time } = req.body;

    const appointment = new Appointment({
      professorId,
      studentId: req.user.userId,
      date,
      time,
      status: 'booked'
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Professor sees their appointments with student names
router.get('/professor/my', auth('professor'), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      professorId: req.user.userId,
      status: 'booked'
    }).populate('studentId', 'username'); // student names
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Student sees their own appointments with professor names
router.get('/my', auth('student'), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      studentId: req.user.userId,
      status: 'booked' // Show only booked ones
    }).populate('professorId', 'username'); // populate professor name
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Professor cancels appointment
router.delete('/:appointmentId', auth('professor'), async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: 'cancelled' });
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
