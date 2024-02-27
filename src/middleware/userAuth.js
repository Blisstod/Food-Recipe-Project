// src/middleware/userAuth.js

const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log(token)

        if (!token) {
            res.render('auth/login', { req: req })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.user._id });

        if (!user) {
            res.render('auth/login', { req: req})
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.render('auth/login', { req: req, message: 'Authentication error: ' + error.message + '. Login again!' })
    }
};

module.exports = userAuth;
