const express = require('express');
const { followClub, unfollowClub,getFollowedClubs } = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/follow', followClub);
router.post('/unfollow',  unfollowClub);
router.get('/:userId/followedClubs', getFollowedClubs);

module.exports = router;

