const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    try {
        let token = req.headers.authorization;

        if(!token){
            return res.status(400).send({
                success : false,
                message : "Token Not Found",
            });
        }

        let newToken = token.slice(7);
        jwt.verify(newToken,'Sparky',(err,decodeToken) => {
            if(err){
                return res.status(400).send({
                    success : false,
                    message : "Enter The valid Token",
                });
            }
            req.user = decodeToken.paylod ;
            return next();
        });

        } catch (err) {
            return res.status(501).send({
                success : false,
                message : err
            });
        }
}

const Admin = async (req,res,next) => {
    try { 
        if(req.user.role != "admin"){
            return res.status(400).send({
                success : false,
                message : "Only Admin Can Access This Route",
            });
        }
        return next();
    } catch (err) {
        return res.status(501).send({
            success : false,
            message : err.message
        });
    }
}


module.exports = {
    verifyToken,Admin

}