const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 4,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Generate JWT
adminSchema.methods.getJWT = function () {
    return jwt.sign(
        { _id: this._id, role: "admin" },
        process.env.JWT_SECRET_STRING_TOKEN,
        { expiresIn: "7d" },
    );
};

// Plain compare (NO HASH — per your request)
adminSchema.methods.validatePassword = function (inputPassword) {
    return inputPassword === this.password;
};

module.exports = mongoose.model("Admin", adminSchema);
