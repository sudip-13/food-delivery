const express = require('express');
const {createAndSendToken,verifyToken} = require('../middlewares/auth')
const {handleUserSignup,handleUserLogin,generateOtp,otpValidatation,setCartItems,getCartItems,decodeJWT,welcome,confirmOrder,setTotalPrice,getTotalPrice,makePayment,getOrderDetails,pendingOrderDetails} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.get('/verifyjwt',verifyToken,welcome);
UserRouter.post('/setcart',setCartItems)
UserRouter.post('/getcart',getCartItems)
UserRouter.post('/decode',decodeJWT)
UserRouter.post('/settotalprice',setTotalPrice)
UserRouter.post('/confirmorder',confirmOrder)
UserRouter.post('/gettotalprice',getTotalPrice)
UserRouter.post('/makepayment',makePayment)
UserRouter.post('/getorderdetails',getOrderDetails)
UserRouter.post('/getpendingorderdetails',pendingOrderDetails)




module.exports = UserRouter;