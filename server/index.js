const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/Users')
const AdminModel = require('./models/admin')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001;

mongoose.connect("mongodb+srv://Team-Louda:bsdk%40007@project-1.jd5yyyy.mongodb.net/")
  .then(console.log('DB connected'))
  .catch((error)=>console.log('DB connection failed',error))


app.post('/login',(req,res)=>{
  const {email,password} = req.body;
  userModel.findOne({email:email})
  .then(user=>{
    if(user){
            if(user.password === password){
                res.json("Success");
            }
            else{
                res.json("Incorrect password");
              }
        }
        else{
          res.json("No records found");
        }
      })
    })
    
    app.post('/admin/registration',async(req,res)=>{
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
    })
    
    app.post('/',async(req,res)=>{
        const {first_name, last_name, email, student_code, department, phone_number, password, confirm_password} = req.body;
        try {
            console.log(`Received data: First Name - ${first_name},Last name -${last_name},Student code - ${student_code}, Department -${department}, Email - ${email},Phone Number - ${phone_number}, Password - ${password},Confirm Password - ${confirm_password}`);
            const newUser = new userModel({first_name, last_name, student_code, department, email,phone_number, password, confirm_password})
            await newUser.save();
            res.status(200).send({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    })

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})