const jwt = require('jsonwebtoken');

const { secret } = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization || req.body.authorization;
    

    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                return res.status(401).json({
                    message: "Varification Error!", 
                    error: err.name === "TokenExpiredError" ? "Please Login to continue" : err
                });
            }

            req.decoded = decoded;

            next();

        });
    }else {
        return res.status(401).json({
            message: "Token not found!"
        });
    }
}