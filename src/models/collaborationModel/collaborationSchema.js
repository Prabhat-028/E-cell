const mongoose = require("mongoose");

const collaborationSchmea = new mongoose.Schema({
	photoUrl: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	about: {
		type: String,
		required: true,
	}
}, { timestamps: true });

module.exports = mongoose.model("collabSchmea", collaborationSchmea);