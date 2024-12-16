const userModel = require('../models/user.model');


//user creation
module.exports.createUser = async({
    firstname, lastname, email, password
}) =>{
    //checking
    if(!firstname || !email || !password){
        throw new Error('All Feilds are required');
    }
    //create user
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}