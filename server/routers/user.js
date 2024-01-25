const express = require('express');
const {handleUserSignup,handleUserLogin,generateOtp,otpValidatation,setCartItems,getCartItems} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.post('/setcart',setCartItems)
UserRouter.post('/getcart',getCartItems)


module.exports = UserRouter;