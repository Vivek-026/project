const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Club = require("../models/Club");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.register = async (req, res) => {
    try {
        console.log("Received registration request:", req.body);

        const { name, email, password, role, club } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (role === "club-admin" && !club) {
            return res.status(400).json({ message: "Club name is required for club-admins" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let clubData = await Club.findOne({ name: club });

        let newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            club: role === "club-admin" ? club : null
        });

        await newUser.save(); // ✅ Save the user first to get the ObjectId

        if (role === "club-admin") {
            console.log("Checking if club exists:", club);

            if (!clubData) {
                console.log("Club does not exist, creating new club...");
                clubData = new Club({
                    name: club,
                    description: `${club} - Created by ${name}`,
                    admin: [newUser._id], // ✅ Use ObjectId
                    members: [newUser._id] // ✅ Use ObjectId
                });
            } else {
                console.log("Club exists, assigning admin...");
                clubData.admin.push(newUser._id);
                clubData.members.push(newUser._id);
            }

            await clubData.save();
        }

        console.log("User created:", newUser);

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "User registered successfully", user: newUser, token });

    } catch (err) {
        console.error("Error in register:", err);
        res.status(500).json({ message: err.message });
    }
};


  exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get Current User
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Forgot Password (Generate Reset Token & Send Email)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour

        await user.save();

        // Send reset email
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. If you did not request this, ignore this email.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to email!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Reset Password (Set New Password)
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.json({ message: "Password reset successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
