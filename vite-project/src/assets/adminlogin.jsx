import React, { useState } from "react";
import "./adminlogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async(e) => {
    console.log("OTP sent to:", email);
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/admin/sendotp",{email})
      console.log(result.data);
    } catch (error) {
      console.log("Failed to sent otp", error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/admin/verifyotp",{otp})
      console.log(result.data);
    } catch (error) {
      console.log("Failed to sent otp", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </label>
      <br />
      <form onSubmit={handleSendOtp}>
        <button type="button">Send OTP</button>
        <button type="submit">Login</button>
      </form>
    </form>
  );
};

export default AdminLogin;
