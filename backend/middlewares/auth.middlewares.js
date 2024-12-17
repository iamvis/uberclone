const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');


//authantication of user
//cheking user by token or header

//logic for authUser
module.exports.authUser = async (req, res, next)=>{
    //extracking token from cookies and header(have to use splite fro only geting token)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
   
    //checking token present in cookies or in  headers
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }


    //checking blacklisted token in db  //not implemented here, this is just an example.
    const isBlacklisted = await blacklistTokenModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    //decoded by try and catch
    try{
        //verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'})
    }
}