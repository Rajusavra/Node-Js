const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: true,
                message: "Token Not Found"
            });
        }
        let newToken = token.slice(7,token.length);
        jwt.verify(newToken, 'Sparky', (err, decodeToken) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid Token"
                });
            }
            req.user = decodeToken.teacherToken;
            return next();
        });

    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports = {
    Auth
}