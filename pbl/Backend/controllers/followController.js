const User = require('../models/User');
const Club = require('../models/Club');
exports.followClub = async (req, res) => {
   try {
       const { clubId } = req.body;
       if (!req.user) return res.status(401).json({ message: "Unauthorized: User not logged in" });

       const userId = req.user.id;

       const user = await User.findById(userId);
       const club = await Club.findById(clubId);

       if (!user) return res.status(404).json({ message: 'User not found' });
       if (!club) return res.status(404).json({ message: 'Club not found' });

       if (!user.followedClubs) user.followedClubs = [];
       if (!club.members) club.members = [];

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
       res.status(500).json({ message: err.message });
   }
};


exports.unfollowClub = async (req, res) => {
   try {
       const { clubId } = req.body;
       if (!req.user) return res.status(401).json({ message: "Unauthorized: User not logged in" });

       const userId = req.user.id;

       const user = await User.findById(userId);
       const club = await Club.findById(clubId);

       if (!user) return res.status(404).json({ message: 'User not found' });
       if (!club) return res.status(404).json({ message: 'Club not found' });

       // Remove the club from user's followedClubs list
       user.followedClubs = user.followedClubs.filter(id => id.toString() !== clubId);
       await user.save();

       // Remove the user from the club's members list
       club.members = club.members.filter(id => id.toString() !== userId);
       await club.save();

       res.json({ message: 'Club unfollowed successfully', followedClubs: user.followedClubs });
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
};
