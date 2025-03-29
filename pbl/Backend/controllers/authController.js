const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Club =require('..//models/Club');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        // Generate a token for the new user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token and user data in the response
        res.json({ message: 'User registered successfully', token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      let club = null;
  
      // If user is a club admin, fetch their club details
      if (user.role === "club-admin") {
        club = await Club.findOne({ admin: user._id }).select("name description");
      }
  
      // Send user and club details
      res.json({ token, user, club });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };