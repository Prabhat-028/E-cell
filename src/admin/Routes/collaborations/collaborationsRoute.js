const express = require("express");
const adminAuth = require("../../../middlewares/adminAuth");
const collaborationModel = require("../../../models/collaborationModel/collaborationSchema");

const collaborationRouter = express.Router();

// ✅ GET ALL COLLABORATIONS
collaborationRouter.get(
    "/admin/collaborations",
    adminAuth,
    async (req, res) => {
        try {
            const data = await collaborationModel
                .find()
                .sort({ createdAt: -1 });

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

// ✅ GET SINGLE COLLABORATION
collaborationRouter.get(
    "/admin/collaborations/:id",
    adminAuth,
    async (req, res) => {
        try {
            const item = await collaborationModel.findById(req.params.id);

            if (!item) {
                return res
                    .status(404)
                    .json({ message: "Collaboration not found" });
            }

            res.status(200).json({ data: item });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
);

// ✅ CREATE COLLABORATION
collaborationRouter.post(
    "/admin/collaborations",
    adminAuth,
    async (req, res) => {
        try {
            const { photoUrl, name, about } = req.body;

            if (!photoUrl || !name || !about) {
                return res.status(400).json({
                    message: "All fields are mandatory",
                });
            }

            const collaborationData = await collaborationModel.create({
                photoUrl,
                name,
                about,
            });

            res.status(201).json({
                message: "Collaboration saved successfully",
                data: collaborationData,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        }
    },
);

// ✅ UPDATE COLLABORATION (Partial Allowed)
collaborationRouter.patch(
    "/admin/collaborations/:id",
    adminAuth,
    async (req, res) => {
        try {
            const updatedData = await collaborationModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true },
            );

            if (!updatedData) {
                return res.status(404).json({
                    message: "Collaboration not found",
                });
            }

            res.status(200).json({
                message: "Collaboration updated successfully",
                data: updatedData,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        }
    },
);

// ✅ DELETE COLLABORATION
collaborationRouter.delete(
    "/admin/collaborations/:id",
    adminAuth,
    async (req, res) => {
        try {
            const deletedData = await collaborationModel.findByIdAndDelete(
                req.params.id,
            );

            if (!deletedData) {
                return res.status(404).json({
                    message: "Collaboration not found",
                });
            }

            res.status(200).json({
                message: "Collaboration deleted successfully",
                data: deletedData,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        }
    },
);

module.exports = collaborationRouter;
