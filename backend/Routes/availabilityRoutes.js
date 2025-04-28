const express = require('express');
const Availability = require('../models/Availability');
const router = express.Router();
const auth = require('../utils/authMiddleware');

router.post('/', auth('professor'), async (req, res) => {
  const { date, timeSlots } = req.body;
  const availability = new Availability({ professorId: req.user.userId, date, timeSlots });
  await availability.save();
  res.status(201).json(availability);
});

router.get('/:professorId', auth(), async (req, res) => {
  const slots = await Availability.find({ professorId: req.params.professorId });
  res.json(slots);
});

module.exports = router;