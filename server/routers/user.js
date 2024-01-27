const express = require('express');
const {createAndSendToken,verifyToken} = require('../middlewares/auth')
const {handleUserSignup,handleUserLogin,generateOtp,otpValidatation,setCartItems,getCartItems,decodeJWT,welcome} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.get('/verifyjwt',verifyToken,welcome);
UserRouter.post('/setcart',verifyToken,setCartItems)
UserRouter.post('/getcart',verifyToken,getCartItems)
UserRouter.post('/decode',verifyToken,decodeJWT)

module.exports = UserRouter;