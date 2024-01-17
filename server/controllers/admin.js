const AdminModel = require("../models/admin");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: "bikikutta25@gmail.com",
      pass: "coaf nrcc kmic hnxy"
  }
});

async function handleAdminSignup(req,res){
  const {fullName,email,phoneNumber,aadharNumber} = req.body;
  const aadharCard=req.file.filename
  try{
    console.log(`Received data: Full name-${fullName},Email-${email},Phone-${phoneNumber},Aadhar Number-${aadharNumber}`)
    const newAdmin = new AdminModel({fullName,email,phoneNumber,aadharNumber,aadharCard});
    await newAdmin.save();

    res.status(200).send({ message: 'Admin registered successfully' });
  }
  catch(error){
    console.error(error)
    res.status(500).send({ message: 'Internal server error' });
  }
}

async function generateOtp(req, res) {
  const email = req.body;
  console.log(email);
  let newotp = "";
  for (let i = 0; i <= 3; i++) {
    newotp += Math.floor(Math.random() * 10).toString();
  }
  try{
    const admin = await AdminModel.findOneAndUpdate(
      email,
      { $set: { otp: newotp } },
      { new: true }
    );
    const mailOptions = {
      from: 'bikikutta25@gmail.com',
      to:email.email,
      subject: 'OTP-Verification',
      text: `Food delivery app verification OTP - ${newotp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    if (admin) {
      res.status(200).send({ message: "Otp Success"});
    } else {
      res.status(404).send({ message: "No existing admin found" });
    }
  } catch(error){
    console.error(error);
    res.status(500).send({ message: "OTP generation failed" });
  }
}

async function otpValidatation(req,res){
  const otp = req.body;
  try {
    const admin = await AdminModel.findOne(otp);
    if (admin) {
      res.status(200).json('Success');
    } else {
      res.status(401).json('Invalid OTP');
    }
  } catch(error){
    console.error(error);
    res.status(502).send({ message: "OTP validation failed, Internal server error" });
  }
}



module.exports = { handleAdminSignup, generateOtp,otpValidatation};
