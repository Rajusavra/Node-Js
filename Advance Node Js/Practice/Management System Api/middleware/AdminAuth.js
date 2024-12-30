const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: true,
                message: "Unauthorized access"
            });
        }
        let newToken = token.slice(7, token.length);
        jwt.verify(newToken, 'Sparky', (err, decodeToken) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Token is not valid"
                });
            }
            req.user = decodeToken.adminToken;
            return next();
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Invalid token"
        });
    }
}

module.exports = {
    adminAuth
}