// routes/postRoutes.js (Post Routes)
const express = require('express');
const { createPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authMiddleware, createPost);
module.exports = router;