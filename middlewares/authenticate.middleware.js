const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authenticate = (req,res,next) =>{
    
    const token = req.headers['authorization'];

    if(!token){
        return next({
            msg: 'User not authorized!'
        })
    }
    if(token){
        jwt.verify(token, process.env.JWTSECRET, function(err, dec){
          
            if(err){
               return next({
                msg: 'Token Error',
                err: err
               })
            }
            User.findById(dec.id).exec(function(err, user){
                if(err){
                    msg: 'User not present'
                }
                if(!user){
                    next({
                        msg: 'User not present'
                    })
                }
                req.user = user;
                next();
            })
        })
    }

}

module.exports = authenticate;