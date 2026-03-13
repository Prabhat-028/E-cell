const express = require("express");
const startUpListModels = require("../../models/startUpList/startUpList.models");
const router = express.Router();


// CREATE STARTUP
router.post("/admin/startup", async (req, res) => {
    try {
        const startup = new startUpListModels(req.body);
        await startup.save();

        res.status(201).json({
            success: true,
            data: startup,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL STARTUPS
router.get("/admin/startup", async (req, res) => {
    try {
        const startups = await startUpListModels.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: startups,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET SINGLE STARTUP
router.get("/admin/startup/:id", async (req, res) => {
    try {
        const startup = await startUpListModels.findById(req.params.id);

        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }

        res.json({
            success: true,
            data: startup,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE STARTUP
router.put("/admin/startup/:id", async (req, res) => {
    try {
        const startup = await startUpListModels.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }

        res.json({
            success: true,
            data: startup,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE STARTUP
router.delete("/admin/startup/:id", async (req, res) => {
    try {
        const startup = await startUpListModels.findByIdAndDelete(
            req.params.id,
        );

        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }

        res.json({
            success: true,
            message: "Startup deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
