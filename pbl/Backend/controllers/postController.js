const Post = require('../models/Post');

// Create Post (Protected)
exports.createPost = async (req, res) => {
    try {
        const { name, title, content, image } = req.body;
        const post = new Post({ name, title, content, image });
        await post.save();
        res.json({ message: 'Post added successfully', post });
    } catch (err) { 
        res.status(500).json({ message: 'Failed to add post: Invalid data' }); 
    }
};

// ✅ Fetch All Posts (No Authentication Required)
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from DB
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};
