const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/Users');
const {setUser} = require('../services/auth')


async function handleUserSignup(req,res){
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
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
  userModel.findOne({email:email})
  .then(user=>{
    if(user){
        if(user.password === password){
            try{

                const token = setUser(user);
                res.cookie('cookie-1',token,{domain: 'http://localhost:5173',
                path: '/login', 
                secure: false,
                httpOnly: false,
                sameSite: 'None',});
                res.json('Success');
            }
            catch(error){
                console.log('error!',error);
            }
        }
        else{
            res.json("Incorrect password");
        }
    }
    else{
        res.json("No records found");
    }
    })
}


module.exports = {handleUserSignup,handleUserLogin};