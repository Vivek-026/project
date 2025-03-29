const mongoose = require('mongoose');  // ✅ Import mongoose

const PostSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
