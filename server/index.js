const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const { Server } = require('socket.io');
const http = require('http')



const app = express();
const PORT = 3000;
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
  });

mongoose
  .connect(
    "mongodb+srv://Mukesh:Mukesh%402002@learn-mongodb.yxla1ty.mongodb.net/Food-Delivery/"
  )
  .then(console.log("DB connection activated"))
  .catch((error) => {
    console.log("DB connection failed", error);
  });

app.post("/admin/login",(req,res)=>{
  const email = req.body;
  UserModel.findOne({email:email})
  .then((admin)=>{
    if(admin){
      res.json("Success")
    }
    else{
      res.json("No records found")
    }
  })
})

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email:email })
  .then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("No records found");
    }
  });
});

app.post('/',async(req,res)=>{
  console.log("connected to server")

  const {first_name, last_name, email, student_code, department, phone_number, password, confirm_password} = req.body;
  try {
      console.log(`Received data: First Name - ${first_name},Last name -${last_name},Student code - ${student_code}, Department -${department}, Email - ${email},Phone Number - ${phone_number}, Password - ${password},Confirm Password - ${confirm_password}`);
      const newUser = new UserModel({first_name, last_name, student_code, department, email,phone_number, password, confirm_password})
      await newUser.save();
      res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
})

app.listen(PORT, () => {
  console.log(`server listen at http://localhost${PORT}`);
});