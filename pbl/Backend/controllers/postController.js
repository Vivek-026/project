const Post = require('../models/Post');
const cloudinary = require("../config/cloudinary");

// Create Post (Protected)
exports.createPost = async (req, res) => {
    try {
        const { name, title, content} = req.body;

        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);

        const post = new Post({ 
            name, 
            title, 
            content,
            image: result.secure_url
         });
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
