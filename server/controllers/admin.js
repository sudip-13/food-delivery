const AdminModel = require('../models/admin')

async function handleAdminSignup(req,res){
    const {fullName,email,phoneNumber,aadharNumber,aadharCard} = req.body;
    try{
      console.log(`Received data: Full name-${fullName},Email-${email},Phone-${phoneNumber},Aadhar card-${aadharNumber}`)
      const newAdmin = new AdminModel({fullName,email,phoneNumber,aadharNumber,aadharCard});
      await newAdmin.save();
      res.status(200).send({ message: 'Admin registered successfully' });
    }
    catch(error){
      console.error(error)
      res.status(500).send({ message: 'Internal server error' });
    }
}



module.exports = {handleAdminSignup};