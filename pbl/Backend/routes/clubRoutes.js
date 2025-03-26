const express = require('express');
const { createClub , getAllClubs, getClubById} = require('../controllers/clubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createClub);
router.get('/',getAllClubs);
router.get('/:id', getClubById);

module.exports = router;