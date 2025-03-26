const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ Fix: Store ObjectIds
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // ✅ Fix: Store ObjectIds
}, { timestamps: true });

module.exports = mongoose.model("Club", ClubSchema);
