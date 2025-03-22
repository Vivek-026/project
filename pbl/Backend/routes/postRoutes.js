const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Create a new post (No authentication required for now)
router.post('/', authMiddleware,createPost);

// ✅ Fetch all posts (No authentication required)
router.get('/', getPosts);

module.exports = router;
