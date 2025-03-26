const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "leader", "club-admin"],
      default: "student",
      required: true,
    },
    club: {
      type: String,
      type: String,
    required: function () { return this.role === "club-admin"; }, 
    default: function () { return this.role === "club-admin" ? "" : null; }
    },
    followedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }], // ✅ Allow following multiple clubs
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
