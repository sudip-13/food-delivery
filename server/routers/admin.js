const express = require('express');
const {handleAdminSignup} = require('../controllers/admin')
const AdminRouter = express.Router();

AdminRouter.post('/signup',handleAdminSignup)

module.exports = AdminRouter;