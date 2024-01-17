const express = require('express');
const multer = require('multer');
const {handleAdminSignup,generateOtp,otpValidatation} = require('../controllers/admin')

const AdminRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });

const upload = multer({ storage: storage });

AdminRouter.post('/sendotp',generateOtp)
AdminRouter.post('/verify',otpValidatation)
AdminRouter.post('/signup',upload.single('aadharCard'),handleAdminSignup)

module.exports = AdminRouter;