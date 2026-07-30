const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for profile pictures (images only)
const profilePictureStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shadowlearn/profile-pictures',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [{ width: 400, height: 400, crop: 'fill', quality: 'auto' }],
    },
});

// Storage for workflow videos
const workflowVideoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shadowlearn/workflow-videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'webm', 'mov', 'avi'],
    },
});

module.exports = { cloudinary, profilePictureStorage, workflowVideoStorage };
