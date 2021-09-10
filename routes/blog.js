const router = require('express').Router();
const authorize = require('../middlewares/authorize.middleware');

router.route('/')
.post(authorize, function(req,res,next){
console.log('blog')
})

.get(function(req,res,next){
console.log('get')
})



module.exports = router;
