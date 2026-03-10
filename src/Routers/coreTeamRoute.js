const express = require("express");
const coreTeamModel = require("../models/coreTeamModel/coreTeamModel");
const coreTeam = express.Router();

coreTeam.get("/member/coreTeam", async (req, res) => {
    try {
        const coreTeam = await coreTeamModel.find({ isActive: true });

        return res.status(200).json({
            message: "Current Core Team fetched successfully",
            data: coreTeam,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
module.exports = coreTeam;