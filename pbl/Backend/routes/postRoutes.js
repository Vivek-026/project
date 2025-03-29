const express = require('express');
const { createPost, getPosts, deletePost, updatePost } = require('../controllers/postController');
const router = express.Router();

// Create a new post (No authentication required for now)
router.post('/', createPost);

// Fetch all posts (No authentication required)
router.get('/', getPosts);

// Delete a post by ID
router.delete('/:id', deletePost);

// Update a post by ID
router.put('/:id', updatePost);

module.exports = router;