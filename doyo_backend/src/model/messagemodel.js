const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  content: { type: String, required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref:'Booking', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
