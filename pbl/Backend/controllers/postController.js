// controllers/postController.js
const Post = require('../models/Post');
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// Create Post (Only for Club-Admins)
exports.createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        
        const user = await User.findById(req.user._id);
        if (!user || user.role !== "club-admin") {
            return res.status(403).json({ message: "Forbidden: Only club-admins can create posts" });
        }
        
        const { title, content } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No image file uploaded" });
        }
        
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: "posts",
            use_filename: true,
            unique_filename: false
        });
        
        const post = new Post({
            createdBy: user._id,
            title,
            content,
            image: result.secure_url
        });
        
        await post.save();
        res.json({ message: "Post added successfully", post });
    } catch (err) {
        res.status(500).json({ message: "Failed to upload post", error: err.message });
    }
};

// Fetch All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "name email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

// Update Post (Only by Creator)
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: Only the creator can update this post" });
        }

        // Check if a new image is uploaded
        let imageUrl = post.image;
        if (req.files && req.files.image) {
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "posts",
                use_filename: true,
                unique_filename: false
            });
            imageUrl = result.secure_url;
        }

        // Update the post
        post.title = title || post.title;
        post.content = content || post.content;
        post.image = imageUrl;

        await post.save();
        res.json({ message: "Post updated successfully", post });
    } catch (err) {
        res.status(500).json({ message: "Failed to update post", error: err.message });
    }
};

// Delete Post (Only by Creator or Club-Admin)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        const user = await User.findById(req.user._id);
        if (post.createdBy.toString() !== req.user._id.toString() && user.role !== "club-admin") {
            return res.status(403).json({ message: "Forbidden: Only the creator or a club-admin can delete this post" });
        }
        
        await Post.findByIdAndDelete(id);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete post", error: err.message });
    }
};