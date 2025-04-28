const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['student', 'professor'], required: true }
});

module.exports = mongoose.model('User', userSchema);
