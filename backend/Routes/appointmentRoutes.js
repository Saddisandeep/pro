const express = require('express');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');
const router = express.Router();
const auth = require('../utils/authMiddleware');

router.post('/', auth('student'), async (req, res) => {
  const { professorId, date, time } = req.body;
  const appointment = new Appointment({
    professorId,
    studentId: req.user.userId,
    date,
    time
  });
  await appointment.save();
  res.status(201).json(appointment);
});

router.get('/my', auth('student'), async (req, res) => {
  const appointments = await Appointment.find({ studentId: req.user.userId });
  res.json(appointments);
});

router.delete('/:appointmentId', auth('professor'), async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: 'cancelled' });
  res.json({ message: 'Appointment cancelled' });
});

module.exports = router;