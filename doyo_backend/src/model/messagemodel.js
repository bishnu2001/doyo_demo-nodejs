const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
