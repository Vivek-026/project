// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware,createPost);
router.get('/', getPosts);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
