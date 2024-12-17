const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlewares')

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

//for sign in validation by express-validator
router.post('/login', [
    //checking+ validation result send to the express-validator used in controller
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6')
],

userController.loginUser);

//profile route + using  middleware for authantication
router.get('/profile',authMiddleware.authUser ,userController.getUserProfile)

//logute route + using middleware for
router.get('/logout', authMiddleware.authUser,userController.logoutUser)

module.exports = router;