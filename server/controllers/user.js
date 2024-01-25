const { setUser } = require("../services/auth");
const { UserModel, CartModel } = require("../models/Users");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "bikikutta25@gmail.com",
    pass: "coaf nrcc kmic hnxy",
  },
});

async function handleUserSignup(req, res) {
  const {
    first_name,
    last_name,
    email,
    student_code,
    department,
    phone_number,
    password,
    confirm_password,
  } = req.body;
  try {
    console.log(
      `Received data: First Name - ${first_name},Last name -${last_name},Student code - ${student_code}, Department -${department}, Email - ${email},Phone Number - ${phone_number}, Password - ${password},Confirm Password - ${confirm_password}`
    );
    const newUser = new UserModel({
      first_name,
      last_name,
      student_code,
      department,
      email,
      phone_number,
      password,
      confirm_password,
    });
    await newUser.save();
    res.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        try {
          const token = setUser(user);
          res.cookie("cookie-1", token), res.status(202).json(token);
        } catch (error) {
          console.log("error!", error);
        }
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("No records found");
    }
  });
}

async function generateOtp(req, res) {
  const email = req.body;
  console.log(email);
  let newotp = "";
  for (let i = 0; i <= 3; i++) {
    newotp += Math.floor(Math.random() * 10).toString();
  }
  try {
    const user = await UserModel.findOneAndUpdate(
      email,
      { $set: { otp: newotp } },
      { new: true }
    );
    const mailOptions = {
      from: "bikikutta25@gmail.com",
      to: email.email,
      subject: "OTP-Verification",
      text: `Food delivery app verification OTP - ${newotp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    if (user) {
      res.status(200).send({ message: "Otp Success" });
    } else {
      res.status(404).send({ message: "No existing user found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "OTP generation failed" });
  }
}

async function otpValidatation(req, res) {
  const { otp, password } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { otp: otp },
    { $set: { password: password, confirm_password: password } },
    { new: true }
  );
  if (user) {
    res.status(201).send("Success");
  } else {
    res.status(502).send("Otp validation failed");
  }
}

async function setCartItems(req, res) {
  const { email, veg_thali, paneer_sabji, roti_paneer, bhaja } = req.body;
  try {
    const userCart = new CartModel({
      email,
      veg_thali,
      paneer_sabji,
      roti_paneer,
      bhaja,
    });
    await userCart.save();
    console.log(
      `Received data: Email - ${email}, Veg thali - ${veg_thali},Paneer Sabji - ${paneer_sabji},Roti Paneer - ${roti_paneer},Bhaja - ${bhaja}`
    );
    res.status(200).send({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Cart updation failed" });
  }
}

async function getCartItems(req, res) {
  const { email } = req.body;
  try {
    const userCart = await CartModel.findOne({ email: email });
    if (userCart) {
      const keysToExtract = [
        "veg_thali",
        "paneer_sabji",
        "roti_paneer",
        "bhaja",
      ];
      const jsonResponse = {};
      keysToExtract.forEach((key) => {
        if (userCart[key] !== undefined) {
          jsonResponse[key] = userCart[key];
        }
      });
      res.status(200).send(jsonResponse);
    } else {
      res.status(404).send({msg : "No Cart items available for you"});
    }
  } catch (error) {
    console.error("Retrieve operation failed !", error);
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  generateOtp,
  otpValidatation,
  setCartItems,
  getCartItems,
};
