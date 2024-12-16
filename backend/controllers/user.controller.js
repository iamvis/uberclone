const userModel = require('../models/user.model');
const userService = require ('../services/user.service');
const {validationResult} = require('express-validator')

//logic for user creation
module.exports.registerUser = async (req, res, next)=>{
    
   //validation response from express-validator
   const errors = validationResult(req); //for data/error
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
   } 
    
    //if all things working well then we invoke the usercreate
    //extracking 
    const {fullname, email, password} = req.body;
    //hashing password
    const hashPassword = await userModel.hashPassword(password);

   const user= await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashPassword,
   });

   //user token genertae
    const token  = user.generateAuthToken();
    res.status(201).json({token, user});

}

//logic for user login
module.exports.loginUser= async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {email, password}= req.body;
    
    
   

// By default, Mongoose does not return fields that are explicitly marked as "excluded" in the model schema (e.g., password might be excluded via select: false in the schema).
// The +password here overrides the default behavior, explicitly including the password field in the query result.
    const user =await userModel.findOne({email}).select('+password');
   
    
    if(!user){
        return res.status(401).json({message: 'Invalid Email or Password'});
    }
  //comparing
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid Email or Password'});
    }
    
    //generate token
    const token = user.generateAuthToken();
    res.status(200).json({token, user});
}