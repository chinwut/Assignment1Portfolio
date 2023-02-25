const mongoose = require('mongoose');

const businessContactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('BusinessContact', businessContactSchema);