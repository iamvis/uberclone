const captainModel= require('../models/captain.model')
module.exports.createCaptain = async({
 firstname, lastname, email, password, color, 
 vehicletype, plate, capacity
})=>{

    //checkling
    if(!firstname ||!email||!password||
       !color||!plate||!capacity|| !vehicletype){
        throw new Error('All fields are required');

    }

    //if all feilds are present then 
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },  
        email,
        password,
        vehicle:{
            color, 
            vehicletype,
            plate,
            capacity
        }
    })
    return captain;
}