const express = require("express");
const { createClub, getAllClubs } = require("../controllers/clubController");
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/create", protect, createClub);

router.get("/", getAllClubs);

module.exports = router;
