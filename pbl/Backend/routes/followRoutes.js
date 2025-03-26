const express = require('express');
const { followClub, unfollowClub } = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/follow', authMiddleware, followClub);
router.post('/unfollow', authMiddleware, unfollowClub);

module.exports = router;
