const express = require('express');
const {handleUserSignup,handleUserLogin,generateOtp,otpValidatation} = require('../controllers/user')
const StaticRouter = express.Router();

StaticRouter.post('/',handleUserLogin)
StaticRouter.post('/signup',handleUserSignup)
StaticRouter.post('/sendotp',generateOtp)
StaticRouter.post('/verify',otpValidatation)

module.exports = StaticRouter;