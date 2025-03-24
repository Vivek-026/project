const express = require('express');
const { followClub, unfollowClub } = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/follow', followClub);
router.post('/unfollow',  unfollowClub);

module.exports = router;

