const express = require("express");
const adminAuth = require("../../../middlewares/adminAuth");
const eventsModel = require("../../../models/EventModel/eventsModel");
const eventCalendarRouter = express.Router();

eventCalendarRouter.get("/admin/eventCalendar", adminAuth, async (req, res) => {
	try {
		
		const events = await eventsModel.find({ scheduledDate: new Date.now() });
		if(!events) throw new Error("NO more Events Scheduled");
		res.status(200).json({
			message: "Event Data Fetched Successfully",
			data: events
		});

	} catch (error) {
		res.status(400).json({ message: "Error Encounterd", error: error.message });
		console.log(error);
	}
});
module.exports = eventCalendarRouter;