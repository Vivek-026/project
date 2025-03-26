const User = require('../models/User');
const Club = require('../models/Club');

exports.followClub = async (req, res) => {
    try {
        const { clubId, userId } = req.body;

        // Find user and club
        const user = await User.findById(userId);
        const club = await Club.findById(clubId);

        // Validate user and club exist
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Debug logging
        console.log("Current followed clubs:", user.followedClubs);
        console.log("Club ID to follow:", clubId);

        // Check if club is already in followed clubs
        const alreadyFollowed = user.followedClubs.some(
            followedClubId => followedClubId.toString() === clubId
        );
        
        if (!alreadyFollowed) {
            // Add club to user's followed clubs
            user.followedClubs.push(clubId);
            await user.save();

            return res.status(200).json({ 
                message: 'Club followed successfully', 
                followedClubs: user.followedClubs.map(id => id.toString())
            });
        } else {
            return res.status(200).json({ 
                message: 'Club already followed',
                followedClubs: user.followedClubs.map(id => id.toString())
            });
        }
    } catch (err) {
        console.error("Follow Club Error:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.unfollowClub = async (req, res) => {
    try {
        const { clubId, userId } = req.body;

        // Find user and club
        const user = await User.findById(userId);
        const club = await Club.findById(clubId);

        // Validate user and club exist
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Remove club from user's followed clubs
        user.followedClubs = user.followedClubs.filter(
            id => id.toString() !== clubId
        );
        await user.save();

        // Optional: Remove user from club's members
        club.members = club.members.filter(
            id => id.toString() !== userId
        );
        await club.save();

        return res.status(200).json({ 
            message: 'Club unfollowed successfully', 
            followedClubs: user.followedClubs 
        });
    } catch (err) {
        console.error("Unfollow Club Error:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.getFollowedClubs = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user and get followed clubs
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert ObjectIds to strings
        const followedClubIds = user.followedClubs.map(id => id.toString());

        return res.status(200).json({
            followedClubs: followedClubIds
        });
    } catch (err) {
        console.error("Get Followed Clubs Error:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};