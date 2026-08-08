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
// resource_type: 'video' ensures Cloudinary returns a /video/upload/... URL
// (not /image/upload/...) so the browser <video> tag can actually play it.
const workflowVideoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shadowlearn/workflow-videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'webm', 'mov'],
        format: 'mp4',           // normalize everything to mp4 for max browser compat
        transformation: [{ quality: 'auto' }], // reduce file size without quality loss
    },
});

module.exports = { cloudinary, profilePictureStorage, workflowVideoStorage };
