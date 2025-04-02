// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const authHeader = req.header("Authorization");
    
//     if (!authHeader) return res.status(401).json({ message: "Access Denied: No Token Provided" });

//     const token = authHeader.split(" ")[1]; // ✅ Extract only the token
//     if (!token) return res.status(401).json({ message: "Access Denied: Invalid Token Format" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(403).json({ message: "Invalid Token" });
//     }
// };

//------------------------------------------------------

const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Import the User model

module.exports = async (req, res, next) => {
    const authHeader = req.headers["authorization"];  // More reliable

    if (!authHeader) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) return res.status(401).json({ message: "Access Denied: Invalid Token Format" });

    console.log("Received Token:", token);

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).populate("followedClubs"); // Fetch user with club details

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            club: user.followedClubs.length > 0 ? user.followedClubs[0]._id : null // Assign the first followed club
        };

        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};
