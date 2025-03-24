const express = require('express');
const { createClub } = require('../controllers/clubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createClub);

module.exports = router;
