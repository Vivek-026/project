const User = require("../models/User");
const Club = require("../models/Club");

exports.getMe = async (req, res) => {
    try {
        console.log("User from token:", req.user);

        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        let club = null;
        if (user.role === "club-admin") {
            club = await Club.findOne({ admin: user._id }).select("name description");
        }

        res.json({ user, club });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
};
