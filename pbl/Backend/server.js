// server.js (Main entry point)
require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes');
const fileupload = require('express-fileupload');
const cron = require('node-cron');
const { sendEventReminders } = require('./controllers/eventController');

const app = express();

app.use(fileupload({
   useTempFiles: true,
   tempFileDir: "./uploads",
   limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(express.json({ limit: "50mb" }));  // Increase JSON request limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));  // Increase URL-encoded request limit

app.use(cors());

app.use('/api', authRoutes);
app.use('/posts', postRoutes);
app.use('/events', eventRoutes);

// Schedule reminder emails to be sent daily at 8:00 AM
cron.schedule('0 8 * * *', async () => {
    try {
        console.log('Running scheduled job: Sending event reminders');
        await sendEventReminders();
    } catch (error) {
        console.error('Error in scheduled job:', error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));