const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;

        // Try to get and verify token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer') &&
            !req.headers.authorization.includes('null')
        ) {
            token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
                req.user = await User.findById(decoded.id).select('-password');
                
                if (req.user) {
                    return next();
                }
            } catch (err) {
                console.error('Invalid token');
                return res.status(401).json({ error: 'Not authorized, token failed' });
            }
        }

        if (!token) {
            return res.status(401).json({ error: 'Not authorized, no token' });
        }
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Server error in auth middleware' });
    }
};

module.exports = { protect };
