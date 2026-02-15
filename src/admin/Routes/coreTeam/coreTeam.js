const express = require("express");
const coreTeamRouter = express.Router();
const adminAuth = require("../../../middlewares/adminAuth");
const coreTeamModel = require("../../../models/coreTeamModel/coreTeamModel");

// ✅ GET ALL MEMBERS
coreTeamRouter.get("/admin/coreTeam/members", adminAuth, async (req, res) => {
    try {
        const members = await coreTeamModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Core team members fetched successfully",
            count: members.length,
            data: members,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ ADD NEW MEMBER
coreTeamRouter.post("/admin/coreteam", adminAuth, async (req, res) => {
    try {
        const { photoUrl, fullName, designation } = req.body;

        if (!photoUrl || !fullName || !designation) {
            return res.status(400).json({
                message: "All fields are mandatory",
            });
        }

        const teamData = await coreTeamModel.create({
            photoUrl,
            fullName,
            designation,
        });

        res.status(201).json({
            message: "New member added successfully",
            data: teamData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ UPDATE MEMBER
coreTeamRouter.patch("/admin/coreteam/:_id", adminAuth, async (req, res) => {
    try {
		const { _id } = req.params;
		if (!_id) return res.status(400).json({ message: "_id is expected to be in the params" });
        const { photoUrl, fullName, designation } = req.body;

        if (!photoUrl || !fullName || !designation) {
            return res.status(400).json({
                message: "All fields are mandatory",
            });
        }

        const updatedData = await coreTeamModel.findByIdAndUpdate(
            _id,
            { photoUrl, fullName, designation },
            { new: true, runValidators: true },
        );

        if (!updatedData) {
            return res.status(404).json({
                message: "Member not found",
            });
        }

        res.status(200).json({
            message: "Member updated successfully",
            data: updatedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = coreTeamRouter;
