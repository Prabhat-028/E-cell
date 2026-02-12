const express = require("express");
const eventsModel = require("../models/EventModel/eventsModel");

const eventRouterList = express.Router();

// =============================
// Upcoming Events
// =============================
eventRouterList.get("/event/upcomingData", async (req, res) => {
    try {
  

        const data = await eventsModel
            .find({ scheduledDate: { $gte: new Date() } })
            .sort({ scheduledDate: 1 }) 

        if (data.length === 0) {
            return res.status(404).json({
                message: "No upcoming events found",
                count: 0,
                data: [],
            });
        }

        res.status(200).json({
            message: "Upcoming events fetched successfully",
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error("Upcoming Events Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// =============================
// Past / Successful Events
// =============================
eventRouterList.get("/event/successfullEvent", async (req, res) => {
    try {
        

        const data = await eventsModel
            .find({ scheduledDate: { $lte: new Date() } })
            .sort({ scheduledDate: -1 }) 

        if (data.length === 0) {
            return res.status(404).json({
                message: "No past events found",
                count: 0,
                data: [],
            });
        }

        res.status(200).json({
            message: "Successful events list fetched",
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error("Past Events Error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = eventRouterList;
