const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserXZ', userSchema);
