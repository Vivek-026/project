require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');  // Call the function instead of importing mongoose
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const clubRoutes = require('./routes/clubRoutes');  
const followRoutes = require('./routes/followRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require("./routes/userRoutes");
const scheduleEmailReminders = require("./services/reminderService");

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
app.use(cors({
    origin: 'http://localhost:5173',  // Vite default port
    credentials: true
  }));

// Routes
setInterval(scheduleEmailReminders, 60 * 1000); 
app.use('/api', authRoutes);
app.use("/api/user", userRoutes);
app.use('/posts', postRoutes);
app.use('/api/clubs', clubRoutes);  
app.use('/api/follow', followRoutes);  
app.use('/api/events', eventRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
