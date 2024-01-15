const express = require('express');
const {handleUserSignup,handleUserLogin} = require('../controllers/user')
const UserRouter = express.Router();

UserRouter.post('/',handleUserSignup)
UserRouter.post('/login',handleUserLogin)

module.exports = UserRouter;