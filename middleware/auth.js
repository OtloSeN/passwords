const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * Middleware function that checks if users are authorized.
 * Place it in each route handler as a middleware function to protect your end point.
 */

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;