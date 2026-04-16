const express = require('express');
const router = express.Router();
const {
    getSolutions,
    createSolution,
    upvoteSolution
} = require('../controllers/solutionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getSolutions)
    .post(protect, createSolution);

router.route('/:id/upvote')
    .put(protect, upvoteSolution);

module.exports = router;
