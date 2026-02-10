const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Login required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING_TOKEN);

        const admin = await adminModel.findById(decoded._id);

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // attach admin to request
        req.admin = admin;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed",
        });
    }
};

module.exports = adminAuth;
