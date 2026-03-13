const express = require("express");
const coreTeamModel = require("../models/coreTeamModel/coreTeamModel");

const pastMemberRouter = express.Router();

pastMemberRouter.get("/pastMembers", async (req, res) => {
    try {
        const pastMembersList = await coreTeamModel.find({ isActive: false });

        if (pastMembersList.length === 0) {
            return res.status(200).json({
                message: "No past members record found.",
                data: [],
            });
        }

        return res.status(200).json({
            message: "Past members retrieved successfully.",
            data: pastMembersList,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving past members.",
        });
    }
});

module.exports = pastMemberRouter;
