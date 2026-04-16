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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// All workflow routes should be protected
router.route('/')
    .get(protect, getWorkflows)
    .post(protect, upload.single('video'), createWorkflow);

router.route('/:id')
    .put(protect, updateWorkflow)
    .delete(protect, deleteWorkflow);

module.exports = router;
