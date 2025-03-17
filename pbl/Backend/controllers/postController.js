const Post = require('../models/Post');
const cloudinary = require("../config/cloudinary");

// Create Post (Protected)
exports.createPost = async (req, res) => {
    try {
        const { name, title, content } = req.body;

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        console.log("Uploading to Cloudinary...");
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: "posts", // Organize images in Cloudinary
            use_filename: true,
            unique_filename: false
        });

        console.log("Cloudinary Upload Successful:", result);

        const post = new Post({
            name,
            title,
            content,
            image: result.secure_url
        });

        await post.save();
        res.json({ message: "Post added successfully", post });
    } catch (err) {
        console.error("Error uploading post:", err);
        res.status(500).json({ message: "Failed to upload post", error: err.message });
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
