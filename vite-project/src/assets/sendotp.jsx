import React from "react";
import axios from "axios";
import "./sendotp.css";

function Sendotp() {
  const [email, setEmail] = useState("");
  const otpgenerate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/admin/sendotp"),
            { email }.then((result) => {
            if (result.data === "Otp Success") {
                console.log("OTP generated successfully");
            } else {
                console.log("Sever error! OTP generation failed");
            }
            });
        } catch (error) {
        console.log("Failed to send otp!");
        }
    };
  return (
    <div className="form-container">
      <h2>ADMIN LOGIN</h2>
      <form id="emailForm" onSubmit={otpgenerate}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <a href="/admin/sendotp" className="submit">
          <button type="submit">Send otp</button>
        </a>
      </form>
    </div>
  );
}
export default Sendotp;
