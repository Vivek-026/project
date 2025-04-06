const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  registrationLimit: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  registrations: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      department: String,
      division: String,
      rollNumber: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
