const express = require("express");
const startUpListModels = require("../models/startUpList/startUpList.models");
const startUpRoute = express.Router();

startUpRoute.get("/startup", async (req, res) => {
    try {
        const startups = await startUpListModels.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: startups.length,
            data: startups,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
module.exports = startUpRoute;