const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();

userRouter.post("/form", async (req, res) => {
	try {
		const formData = req.body;
		if (mobileNo.length > 10 || mobileNo.length < 10) {
			throw new Error("Please Enter Valid Moblie No");
		}
		const data = await new userModel.Save(formData);
		res.status(200).json({ message: "Form Submitted Successfully." })
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "something went wrong!!" });
	}

});
module.exports = userRouter;