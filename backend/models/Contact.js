const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['Lead', 'Client', 'Archived'], default: 'Lead' } 
}, { timestamps: true }); // Adding timestamps is another quick "pro" move

module.exports = mongoose.model('Contact', ContactSchema);