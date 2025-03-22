const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);

        if (!user) return res.status(401).json({ message: "Unauthorized: No user found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
