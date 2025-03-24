const Club = require('../models/Club');
exports.createClub = async (req, res) => {
    try {
        const { name, description } = req.body;
        const adminId = req.user.id; // Extract from JWT token
        console.log(req, req.body, req.user);

        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
        }

        const existingClub = await Club.findOne({ name });
        if (existingClub) return res.status(400).json({ message: "Club name already exists" });

        const newClub = new Club({ name, description, admin: adminId, members: [] });
        await newClub.save();

        res.json({ message: "Club created successfully", club: newClub });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

