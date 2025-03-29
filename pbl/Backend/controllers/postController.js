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

// Fetch All Posts (No Authentication Required)
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from DB
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

// Delete Post (Protected)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        // Find the post first to get the image URL
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Extract public ID from Cloudinary URL to delete image
        const publicId = post.image.split('/').pop().split('.')[0];

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(`posts/${publicId}`);

        // Delete post from database
        await Post.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Failed to delete post", error: err.message });
    }
};

// Update Post (Protected)
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, content } = req.body;

        // Find the existing post
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if a new image is uploaded
        if (req.files && req.files.image) {
            // Delete existing image from Cloudinary
            const oldPublicId = existingPost.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`posts/${oldPublicId}`);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "posts",
                use_filename: true,
                unique_filename: false
            });

            // Update post with new image
            existingPost.image = result.secure_url;
        }

        // Update other fields
        existingPost.name = name || existingPost.name;
        existingPost.title = title || existingPost.title;
        existingPost.content = content || existingPost.content;

        // Save updated post
        await existingPost.save();

        res.json({ 
            message: "Post updated successfully", 
            post: existingPost 
        });
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Failed to update post", error: err.message });
    }
};