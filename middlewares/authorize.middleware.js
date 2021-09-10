
const authorize = (req,res,next) =>{
    if(req.user.role === 'ADMIN'){
        next();
    }
    else{
        return next({
            msg: 'User not Authorized!'
        })
    }
}

module.exports = authorize