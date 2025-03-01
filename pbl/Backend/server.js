// server.js (Main entry point)
require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
