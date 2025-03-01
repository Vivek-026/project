// controllers/postController.js (Post Management)
const Post = require('../models/Post');
exports.createPost = async (req, res) => {
    try {
        const { name, title, content, image } = req.body;
        const post = new Post({ name, title, content, image });
        await post.save();
        res.json({ message: 'Post added successfully', post });
    } catch (err) { res.status(500).json({ message: 'Failed to add post: Invalid data' }); }
};