import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [student_code, setstudent_code] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/", {
        first_name,
        last_name,
        email,
        student_code,
        department,
        phone_number,
        password,
        confirm_password,
      });
      console.log("User registered successfully");
      navigate('/')
    } catch (error) {
      console.log("Error!", error);
    }
  };

  return (
    <div className="sign">
    <div className="container1">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input
                type="text"
                placeholder="Enter your first name"
                required
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input
                type="text"
                placeholder="Enter your last name"
                required
                onChange={(e) => setlast_name(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Student Code</span>
              <input
                type="text"
                placeholder="Enter your Student Code"
                required
                onChange={(e) => setstudent_code(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Department</span>
              <input
                type="text"
                placeholder="Enter your Department"
                required
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                placeholder="Enter your number"
                required
                onChange={(e) => setPhone_Number(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="text"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input
                type="text"
                placeholder="Confirm your password"
                required
                onChange={(e) => setConfirm_Password(e.target.value)}
              />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three"></span>
                <span className="gender">Prefer not to say</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
