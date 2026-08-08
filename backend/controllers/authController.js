const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const User = require('../models/User');
const config = require('../config/config');
const { sendPasswordResetEmail } = require('../config/mailer');

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: '30d',
    });
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Server error getting user' });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: config.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            // Update googleId and profilePicture if not present
            if (!user.googleId) user.googleId = googleId;
            if (!user.profilePicture) user.profilePicture = picture;
            await user.save();
        } else {
            // Create a new user for Google login
            user = await User.create({
                name,
                email,
                googleId,
                profilePicture: picture,
                // Assign a strong random password since our DB required false handles the schema, but just in case
                // Actually password is required: false in schema, so we don't need to pass it.
            });
        }
        
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            token: generateToken(user._id),
        });
        
    } catch (error) {
        console.error('Error in googleLogin:', error);
        res.status(401).json({ error: 'Google authentication failed' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            // Return generic message to prevent email enumeration
            return res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent.' });
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Set token and expiration (1 hour)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // Build reset URL pointing to production frontend
        const frontendUrl = (process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173').replace(/\/$/, '');
        const resetUrl = `${frontendUrl}/resetpassword/${resetToken}`;

        // Send email (tries Gmail SMTP, falls back to Resend)
        await sendPasswordResetEmail(user.email, resetUrl);

        res.status(200).json({ success: true, message: 'Password reset link sent to your email' });

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ error: 'Failed to send reset email. Please try again later.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password has been updated successfully' });

    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ error: 'Server error during password reset' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    googleLogin,
    forgotPassword,
    resetPassword
};
