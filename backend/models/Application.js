const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  personalDetails: {
    name: String,
    address: String,
    phone: String
  },
  financialDetails: {
    income: Number,
    expenses: Number,
    assets: String,
    liabilities: String
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);