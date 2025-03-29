const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Club admin
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Users who follow the club
}, { timestamps: true });

module.exports = mongoose.model('Club', ClubSchema);
