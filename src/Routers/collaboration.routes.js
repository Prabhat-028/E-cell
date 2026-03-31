const express = require("express");
const collaborationSchema = require("../models/collaborationModel/collaborationSchema");
const collaborationRouterUser = express.Router();

//  GET ALL COLLABORATIONS
collaborationRouterUser.get(
	"/collaborations",
	async (req, res) => {
		try {
			const data = await collaborationSchema
				.find()
				.sort({ createdAt: -1 });
			if (data.length == 0) {
				return res.status(200).json({ message: "NO Collaborations Found" });
			} 

			res.status(200).json({
				message: "Collaborations fetched successfully",
				count: data.length,
				data,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
);
module.exports = collaborationRouterUser;