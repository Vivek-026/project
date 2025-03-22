// models/User.js (User Schema)
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { 
        type: String, 
        enum: ['user', 'leader', 'admin'],
        default: 'user' 
    },
    club: { 
        type: String,
        required: function() { return this.role === 'leader'; }
    },
    club:String,
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);