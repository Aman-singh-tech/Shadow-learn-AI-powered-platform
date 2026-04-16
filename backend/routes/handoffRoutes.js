const express = require('express');
const router = express.Router();
const {
    getHandoffs,
    createHandoff,
    updateHandoff
} = require('../controllers/handoffController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getHandoffs)
    .post(protect, createHandoff);

router.route('/:id')
    .put(protect, updateHandoff);

module.exports = router;


