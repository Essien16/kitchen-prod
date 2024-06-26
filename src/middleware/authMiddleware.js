var jwt = require("jsonwebtoken");
const jwt_config = require("../configs/jwt");

let middleware = (req, res, next) => {
    //extract token and handle a case where the token is missing
    var tok = 
        req.headers["access-token"] ||
        req.body["access-token"] ||
        req.headers.authorization ||
        req.headers.Authorization;
    if (!tok) 
        return res.status(403).json({
            auth: false,
            message: "Access denied. Provide your token" + tok,
            error: "Access denied, No token was provided"
        });
    //parse the token if found and handle if it magically disappear after parsing
    else if (req.headers["access-token"]) {
        var token = tok.split(" ")[1];
    } else if (req.headers.authorization) {
        var token = tok.split(" ")[1];
    } else if (req.headers.Authorization) {
        var token = tok.split(" ")[1];
    } else {
        let token = tok;
    }
    if (!token)
        return res.status(403).json({
            auth: false,
            message: "Access denied. Provide your token.",
            erroe: "Access denied, no token was provoided."
        });
    
    //verify token
    jwt.verify(token, jwt_config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                auth: false,
                message: "Token expired",
                error: "Token expired."
            });
        }
        req.user = decoded;

        next();
    });
};

module.exports = middleware;