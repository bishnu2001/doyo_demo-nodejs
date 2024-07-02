// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { configs } = require('../config/index');
const User = require('../model/users.model');

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, configs.SECRET_KEY);
            const userId = decodedToken.id;
            req.userId = userId;
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(403).json({ message: 'Token verification failed' });
        }
    } catch (error) {
        console.error('Error parsing Authorization header:', error);
        return res.status(400).json({ message: 'Invalid Authorization header format' });
    }
};

module.exports = {
    authentication
};
