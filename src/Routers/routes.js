const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();

userRouter.post("/form", async (req, res) => {
    try {
        const formData = req?.body;
        const { mobileNo } = formData;

        // Convert to string for length check
        const mobileStr = mobileNo.toString();

        if (mobileStr.length !== 10) {
            return res
                .status(400)
                .json({ message: "Please enter valid mobile number" });
        }

        const data = new userModel(formData);
        await data.save();

        res.status(200).json({ message: "Form Submitted Successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!!" });
    }
});

module.exports = userRouter;
