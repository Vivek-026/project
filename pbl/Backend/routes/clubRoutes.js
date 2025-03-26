const express = require("express");
const { createClub, getAllClubs } = require("../controllers/clubController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createClub);

router.get("/", getAllClubs);

module.exports = router;
