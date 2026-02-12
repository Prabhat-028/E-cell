const express = require("express");
const eventsModel = require("../models/EventModel/eventsModel");
const eventRouterList = express.Router();

eventRouterList.get("/event/upcomingData", async (req, res) => {
	try {
		const data = await eventsModel.find({
			scheduledDate: $gte[new Date.now()],
		});
		if (!data) throw new Error("Not Any Event Scheduled Yet");
		res.status(200).json({ message: "Event Fetched Successfully!!", data: data });
		
	} catch (error) {
		res.status(400).json({ message: error.message });
		console.log(error);
	}
});

eventRouterList.get("/event/successfullEvent", async (req, res) => {
	try {
		const data = await eventsModel.find({ scheduledDate: $lte[new Date.now()] });
		if (!data) throw new Error("Events are Planned for Future");
		res.status(200).json({ message: "Successfull Events Lists Are Fetched successfull", data: data });
	} catch (error) {
		res.status(400).json({ message: error.message });
		console.log(error);
	}
});
module.exports = eventRouterList;
