import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dfporfl8y",
    api_key: "244749221557343",
    api_secret: "jDkVlzvkhHjb81EvaLjYgtNtKsY",
});
export const uploadSingleImageToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            res.json("please select img")
        }
        if (req.file) {
            const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            const result = await cloudinary.uploader.upload(dataUrl);
            req.uploadedImageUrl = result.secure_url;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "File was not uploaded in backend", error: error.message });
    }
};

