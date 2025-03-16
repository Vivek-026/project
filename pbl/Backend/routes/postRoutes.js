const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');

const router = express.Router();

// ✅ Create a new post (No authentication required for now)
router.post('/', createPost);

// ✅ Fetch all posts (No authentication required)
router.get('/', getPosts);

module.exports = router;
