const jwt= require('jsonwebtoken');
const asynchandler = require('../utils/asynchandler');


const jwtVerify= asynchandler(async(req,res,next)=>{
    const token= req.cookies.jwt||req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    const user= jwt.verify(token,process.env.SECRET);
    req.user=user;
    next();
});

module.exports=jwtVerify;