const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMeddleware= require('../middlewares/auth.middlewares')


//post validation by express validation
router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 characters long'),
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

//post validation by express validation for login
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters')
],
   //passing as captainCopntroller // action perform by logincaptain
   captainController.loginCaptain
)
//get profile request
router.get('/profile', authMeddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMeddleware.authCaptain, captainController.logoutCaptain);

module.exports= router;
