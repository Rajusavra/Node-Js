const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "sparky");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send({ success: false, message: 'Invalid token.' });
    }
};

module.exports = { Auth };