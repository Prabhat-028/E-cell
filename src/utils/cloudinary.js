const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        await fs.promises.unlink(localFilePath);

        return response;
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            await fs.promises.unlink(localFilePath);
        }

        throw error;
    }
};

module.exports = { uploadOnCloudinary };
