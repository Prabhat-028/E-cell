const express = require("express");
const adminModel = require("../../models/adminModel");

const adminRoute = express.Router();

// ---------------- SIGNUP ----------------

adminRoute.post("/admin/signup", async (req, res) => {
	try {
		console.log(req.body)
        const { email, password } = req.body;

		 if (!email || !password) {
             return res
                 .status(400)
                 .json({ message: "Email and password required" });
         }

         if (password.length < 6) {
             return res
                 .status(400)
                 .json({ message: "Password must be at least 6 characters" });
         }

         // 🔹 Check if admin already exists
         const exists = await adminModel.findOne({ email });
         if (exists) {
             return res.status(409).json({ message: "Admin already exists" });
         }

        const admin = new adminModel({ email, password });
        await admin.save();

        const token = admin.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ---------------- LOGIN ----------------

adminRoute.post("/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin || !admin.validatePassword(password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = admin.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ---------------- LOGOUT ----------------

adminRoute.post("/admin/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports = adminRoute;
