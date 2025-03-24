const User = require('../models/User');
const Club = require('../models/Club');
exports.followClub = async (req, res) => {
    try {
        const { clubId } = req.body;
        const userId = "67e0f6f853190d28d4cf3f0f"; // Test User ID

        console.log("User ID:", userId);
        console.log("Club ID:", clubId);

        const user = await User.findById(userId);
        const club = await Club.findById(clubId);

        if (!user) {
            console.log("User Not Found");
            return res.status(404).json({ message: 'User not found' });
        }
        if (!club) {
            console.log("Club Not Found");
            return res.status(404).json({ message: 'Club not found' });
        }

        if (!user.followedClubs.includes(clubId)) {
            user.followedClubs.push(clubId);
            await user.save();
        }

        if (!club.members.includes(userId)) {
            club.members.push(userId);
            await club.save();
        }

        res.json({ message: 'Club followed successfully', followedClubs: user.followedClubs });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.unfollowClub = async (req, res) => {
    try {
        const { clubId } = req.body;
        const userId = "67e0f6f853190d28d4cf3f0f"; // Hardcoded user ID

        const user = await User.findById(userId);
        const club = await Club.findById(clubId);

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!club) return res.status(404).json({ message: 'Club not found' });

        user.followedClubs = user.followedClubs.filter(id => id.toString() !== clubId);
        await user.save();

        club.members = club.members.filter(id => id.toString() !== userId);
        await club.save();

        res.json({ message: 'Club unfollowed successfully', followedClubs: user.followedClubs });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
