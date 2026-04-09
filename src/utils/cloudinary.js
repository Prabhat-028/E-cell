const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, options = {}) => {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
        throw new Error(
            "A valid file buffer is required for Cloudinary upload",
        );
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                ...options,
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (!result) {
                    return reject(
                        new Error("Cloudinary upload failed: empty response"),
                    );
                }

                resolve(result);
            },
        );

        stream.end(fileBuffer);
    });
};

module.exports = { uploadOnCloudinary };
