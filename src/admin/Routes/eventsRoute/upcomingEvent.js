const express = require("express");
const adminAuth = require("../../../middlewares/adminAuth");
const eventsModel = require("../../../models/EventModel/eventsModel");
const eventRouter = express.Router();

eventRouter.post("/admin/upcomingevent/", adminAuth, async (req, res) => {
	try {

		const { photoUrl, scheduledDate, eventName, speaker } = req.body;
        const eventData = new eventsModel({
            photoUrl,
            scheduledDate,
            eventName,
            speaker,
		});
		if(!eventData)throw new Error("No Data found in Request");
		
		const savedEventData = await eventData.save();
		if(!savedEventData)throw new Error("Server Error. Please try again");
		
        res.status(200).json({ message: "Event Saved Successsfully" });
		
	} catch (error) {
		res.status(400).json({ message: error.message });
		console.log(error);
	}
	
});
eventRouter.patch("/admin/upcomingevent/:_id", adminAuth, async (req, res) => {
	try {
		const { _id } = req.params;
		if(!_id)throw new Error("Event Not Found");
		
        const { photoUrl, scheduledDate, eventName, speaker } = req.body;
        const eventData = await eventsModel.findByIdAndUpdate(
            { _id },
            { photoUrl, scheduledDate, eventName, speaker },
		);
		if(eventData)throw new Error("Requested Event Not Found");
		
		const savedEventData = await eventData.save();
		if(!savedEventData)throw new Error("Something Went Wrong!!");
		
        res.status(200).json({
            message: "Event Update Successfully",
            data: savedEventData,
        });
	} catch (error) {
		res.status(400).json({ message: error.message });
		console.log(error);

	}
})
module.exports = eventRouter;