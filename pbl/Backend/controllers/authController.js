// controllers/authController.js (Authentication)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.json({ message: 'User registered successfully', user });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Add these new functions

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user to club leader
exports.promoteToLeader = async (req, res) => {
    try {
        const { userId, club } = req.body;
        
        // Only admins can promote users to leaders
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can promote users to club leaders' });
        }
        
        if (!club) {
            return res.status(400).json({ message: 'Club name is required' });
        }
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = 'leader';
        user.club = club;
        await user.save();
        
        res.json({ message: 'User promoted to club leader', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};