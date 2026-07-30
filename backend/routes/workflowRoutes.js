const express = require('express');
const router = express.Router();
const {
    getWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow
} = require('../controllers/workflowController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { workflowVideoStorage } = require('../config/cloudinary');

// Use Cloudinary storage — files are uploaded to cloud, not local disk
const upload = multer({ storage: workflowVideoStorage });

// All workflow routes should be protected
router.route('/')
    .get(protect, getWorkflows)
    .post(protect, upload.single('video'), createWorkflow);

router.route('/:id')
    .put(protect, updateWorkflow)
    .delete(protect, deleteWorkflow);

module.exports = router;
