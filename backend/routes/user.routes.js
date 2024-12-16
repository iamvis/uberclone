const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller')

//validation by express-validator
router.post('/register',[
    //checking //it will send vlidation result to express-validator and used in controller
    body('fullname.firstname').isLength({min:3}).withMessage('firstname is required at least 3 characters'),
    body('email').isEmail().withMessage('Inavalid email'),
    body('password').isLength({min:6}).withMessage('Password is required at least 6 characters')
    

], 
//passing as usercontroller // action perform by cotroller
userController.registerUser
)


module.exports = router;