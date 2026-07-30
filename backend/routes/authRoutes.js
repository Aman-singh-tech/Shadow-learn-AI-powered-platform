const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, googleLogin, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.get('/me', protect, getMe);   //is line me protect middleware use kr rhe h taki user authenticate ho kr hi apna data dekh ske

module.exports = router;
