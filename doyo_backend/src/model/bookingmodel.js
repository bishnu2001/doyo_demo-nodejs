const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // Other fields like status, pet details, etc.
},{
  timestamps:true
});

module.exports = mongoose.model('Booking', BookingSchema);
