import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setNewPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    console.log("OTP sent to:", email);
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/sendotp/", {
        email,
      });
      console.log(result.data);
      setShowOtpForm(true);
    } catch (error) {
      console.log("Failed to sent otp", error);
    }
  };
  const handleVerifyOtp = async (f) => {
    f.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/verify", {
        otp,
        password,
      });
      if (result.data === "Success") {
        // navigate("/");
        console.log("Password reset successfully");
      } else console.log("Redirection failed!");
    } catch (error) {
      console.log("Otp validation failed! Server error", error);
    }
  };

  return (
    <div className="reset-pass">
      <h2>Reset Password</h2>
      <form id="email-Form" onSubmit={handleSendOtp}>
        <input
          required
          placeholder="Enter your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>

      {showOtpForm && (
        <>
          <h2>OTP VERIFICATION</h2>
          <form id="otp-Form" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              id="otp"
              name="otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter new password"
              id="newpass"
              required
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Verify</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
