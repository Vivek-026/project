const express = require("express");
const { getMe } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure the route is properly set
router.get("/me", protect, getMe);

module.exports = router;
