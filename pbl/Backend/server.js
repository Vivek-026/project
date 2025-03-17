// server.js (Main entry point)
require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const fileupload = require('express-fileupload')

const app = express();

app.use(fileupload({
   useTempFiles: true,
   tempFileDir: "./uploads",
   limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use(express.json({ limit: "50mb" }));  // Increase JSON request limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));  // Increase URL-encoded request limit

app.use(cors());

app.use('/api', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
