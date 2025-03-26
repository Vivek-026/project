const Club = require('../models/Club');

exports.createClub = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        if (req.user.role !== "club-admin") {
            return res.status(403).json({ message: "Forbidden: Only club-admins can create clubs" });
        }

        const { name, description } = req.body;
        const adminId = req.user.id; // Extract from JWT token

        const existingClub = await Club.findOne({ name });
        if (existingClub) return res.status(400).json({ message: "Club name already exists" });

        const newClub = new Club({ name, description, admin: adminId, members: [] });
        await newClub.save();

        res.json({ message: "Club created successfully", club: newClub });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllClubs = async (req, res) => {
   try {
       const clubs = await Club.find().populate("admin", "name email"); // Populate admin details
       res.json(clubs);
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
};

exports.getClubById = async (req, res) => {
   try {
       const club = await Club.findById(req.params.id).populate("admin", "name email").populate("members", "name email");
       if (!club) return res.status(404).json({ message: "Club not found" });

       res.json(club);
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
};