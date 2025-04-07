const Club = require('../models/Club');
const User = require('../models/User'); 

exports.createClub = async (req, res) => {
    try {
        const { name, description } = req.body;
        const adminId = req.user.id;

        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
        }

        const existingClubByAdmin = await Club.findOne({ admin: adminId });
        if (existingClubByAdmin) {
            return res.status(400).json({ message: "You already created a club" });
        }

        const existingClub = await Club.findOne({ name });
        if (existingClub) return res.status(400).json({ message: "Club name already exists" });

        // Create the new club
        const newClub = new Club({ name, description, admin: adminId, members: [] });
        await newClub.save();

        // ✅ Update the club-admin user's `club` field
        await User.findByIdAndUpdate(adminId, { club: newClub._id });

        res.json({ message: "Club created successfully", club: newClub });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find(); // Fetch all clubs from the database
        res.json({ clubs }); // Send clubs in response
    } catch (err) {
        res.status(500).json({ message: "Error fetching clubs" });
    }
};

// GET /club/:id/followers-count

exports.getFollowersCount = async (req, res) => {
    try {
      const club = await Club.findById(req.params.id);
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
  
      const followersCount = club.members.length;
      res.status(200).json({ followersCount });
    } catch (error) {
      res.status(500).json({ message: "Error fetching followers count", error });
    }
  };
  

