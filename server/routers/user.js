const express = require('express');
const {handleUserSignup,handleUserLogin} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.post('/',handleUserLogin)
UserRouter.post('/signup',handleUserSignup)

module.exports = UserRouter;