const mongoose = require("mongoose");

const coreTeamSchema = new mongoose.Schema({
	photoUrl: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true
	}
},{timestamps:true});
module.exports = mongoose.model("CoreTeam", coreTeamSchema);