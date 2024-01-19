const nodemailer = require('nodemailer');
const dotenv =require('dotenv');
dotenv.config({ path: '../config.env' });
// const DB = process.env.db;
const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.sendotpusername,
        pass: process.env.sendotppassword
    }
  });
  
  module.exports = {transporter};