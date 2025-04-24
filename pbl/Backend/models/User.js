// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, default: 'user' }, // 'admin' for club admins
//     followedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }]
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' }, // 'club-admin' for club admins
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }, // 🛠️ Add this field
    followedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
