const jwt = require("jsonwebtoken");
const {Unauthorized} = require("http-errors");

const {User} = require("../models");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    try{
        const [bearer, token] = req.headers.authorization.split(" ");
        if(bearer !== "Bearer"){
            throw new Unauthorized();
        }
        console.log(jwt.verify(token, SECRET_KEY));
        // const {id} = jwt.verify(token, SECRET_KEY);
        // const user = await User.findById(id);
        const user = await User.findOne({token});
        if(!user){
            throw new Unauthorized();
        }
        req.user = user;
        next();
    }
    catch(error){
        throw new Unauthorized(error.message);
    }
};

module.exports = authenticate;
