require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');  // Call the function instead of importing mongoose
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const clubRoutes = require('./routes/clubRoutes');  // Add club routes
const followRoutes = require('./routes/followRoutes');  // Add follow/unfollow routes

// Connect to MongoDB
connectDB();

const app = express();

// File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: { fileSize: 50 * 1024 * 1024 }
}));

// Middleware to handle JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Enable CORS
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/posts', postRoutes);
app.use('/api/clubs', clubRoutes);  // Add club routes
app.use('/api/follow', followRoutes);  // Add follow/unfollow routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
9