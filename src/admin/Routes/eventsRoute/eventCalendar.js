const express = require("express");
const adminAuth = require("../../../middlewares/adminAuth");
const eventsModel = require("../../../models/EventModel/eventsModel");

const eventCalendarRouter = express.Router();

eventCalendarRouter.get("/admin/eventCalendar", adminAuth, async (req, res) => {
    try {
        // ✅ Current date/time
        const now = new Date();

        // ✅ Fetch upcoming events
        const events = await eventsModel
            .find({
                scheduledDate: { $gte: now },
            })
            .sort({ scheduledDate: 1 }); // optional: nearest first

        // ✅ Proper empty check
        if (events.length === 0) {
            return res.status(404).json({
                message: "No upcoming events found",
            });
        }

        res.status(200).json({
            message: "Event Data Fetched Successfully",
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error encountered",
            error: error.message,
        });
    }
});

module.exports = eventCalendarRouter;
