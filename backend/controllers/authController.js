const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const { Resend } = require('resend');
const User = require('../models/User');
const config = require('../config/config');

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
            return res.status(404).json({ error: 'User not found with this email' });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Set token and expiration (1 hour)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // Send email via Resend HTTP API (works on Render free tier)
        // Nodemailer SMTP (port 465/587) is blocked by Render — Resend uses HTTPS
        const resend = new Resend(process.env.RESEND_API_KEY);

        const frontendUrl = process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/resetpassword/${resetToken}`;

        await resend.emails.send({
            from: 'ShadowLearn <onboarding@resend.dev>',
            to: user.email,
            subject: 'Password Reset - ShadowLearn',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">ShadowLearn Password Reset</h2>
                    <p>You requested a password reset for your ShadowLearn account.</p>
                    <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; 
                              border-radius: 8px; text-decoration: none; margin: 16px 0;">
                        Reset Password
                    </a>
                    <p style="color: #888; font-size: 13px;">If you did not request this, ignore this email — your password will remain unchanged.</p>
                    <p style="color: #888; font-size: 12px;">Or copy this link: ${resetUrl}</p>
                </div>
            `
        });

        res.status(200).json({ success: true, message: 'Password reset link sent to email' });

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ error: 'Error sending email' });
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
