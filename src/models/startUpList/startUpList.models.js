const mongoose = require("mongoose");

const startUpSchema = new mongoose.Schema(
    {
        startUpName: {
            type: String,
            required: true,
            trim: true,
        },
        founder: {
            type: String,
            required: true,
            trim: true,
        },
        about: {
            type: String,
            required: true,
            trim: true,
        },
        website: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("StartUp", startUpSchema);
