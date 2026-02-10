const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
	photoUrl: {
		type: String,
	},
	scheduledDate: {
		type: Date,
	},
	eventName: {
		type: String,
	},
	speaker: {
		type: String,
	}
}, {
	timestamps: true,
});
module.exports = mongoose.model( "Events" ,eventSchema );