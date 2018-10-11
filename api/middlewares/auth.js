const jwt = require('jsonwebtoken');

const config = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization || req.body.authorization;
    

    if(token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) {
                return res.status(401).json({
                    message: "Varification Error!", 
                    error: err
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