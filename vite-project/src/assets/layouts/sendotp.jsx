import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/sendotp.css";

function Sendotp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    console.log("OTP sent to:", email);
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:3001/admin/sendotp", {
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
      await axios
        .post("http://localhost:3001/admin/verify", {
          otp,
        })
        .then((result) => {
          if (result.status === 202) {
            document.cookie = `adminlogincookie=${result.data}`;
            navigate("/admin/home");
          } else {
            console.log("Incorrect otp!");
          }
        });
    } catch (error) {
      console.log("Otp validation failed! Server error", error);
    }
  };

  return (
    <div className="sendotp">
      <div className="form-container">
        <h2>ADMIN LOGIN</h2>
        <form id="emailForm" onSubmit={handleSendOtp}>
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
            <br />
            <h2>OTP VERIFICATION</h2>
            <form id="otpForm" onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                id="otp"
                name="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit">Verify</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
export default Sendotp;
