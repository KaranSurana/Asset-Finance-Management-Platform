const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
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
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

module.exports = mongoose.model('Application', applicationSchema);