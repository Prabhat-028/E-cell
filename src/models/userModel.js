const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true
	},
	mobileNo: {
		type: Number,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	idea: {
		type: Boolean,
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