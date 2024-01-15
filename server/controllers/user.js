const userModel = require('../models/Users')

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
}


module.exports = {handleUserSignup,handleUserLogin};