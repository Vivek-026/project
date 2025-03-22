const Post = require('../models/Post');
const cloudinary = require("../config/cloudinary");
const User = require("../models/User"); // Import User model to verify role

// Create Post (Only for Leaders)
exports.createPost = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // Fetch the user from the database to check role
        const user = await User.findById(req.user._id);
        if (!user || user.role !== "leader") {
            return res.status(403).json({ message: "Forbidden: Only leaders can create posts" });
        }

        const { title, content } = req.body;

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        console.log("Uploading to Cloudinary...");
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: "posts",
            use_filename: true,
            unique_filename: false
        });

        console.log("Cloudinary Upload Successful:", result);

        // Store leader's ID as "createdBy"
        const post = new Post({
            createdBy: user._id, // Store leader ID
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
        const posts = await Post.find().populate("createdBy", "name email"); // Show leader's details
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};
