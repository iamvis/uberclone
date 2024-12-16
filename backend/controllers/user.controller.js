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