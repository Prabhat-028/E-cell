const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required:true,
	},
	mobileNo: {
		type: Number,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	emailId: {
		type: String,
		required: true,
	},
	studentType: {
		type: String,
		required: true,
	}
});
module.exports = mongoose.model("User", userSchema);