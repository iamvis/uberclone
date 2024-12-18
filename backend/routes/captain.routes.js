const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller')


//post validation by express validation
router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Inavalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:4}).withMessage('Plate must be at least 4 characters'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1 '),
    body('vehicle.vehicletype').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    //passing as captainController // action perform by controller
    captainController.registerCaptain
)



module.exports= router;
