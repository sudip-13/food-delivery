const express = require('express');
const {handleUserSignup,handleUserLogin,generateOtp,otpValidatation,setCartItems,getCartItems,decodeJWT} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.post('/setcart',setCartItems)
UserRouter.post('/getcart',getCartItems)
UserRouter.post('/decode',decodeJWT)


module.exports = UserRouter;