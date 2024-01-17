import React from 'react';
import './verifyotp.css'

const OtpVerify = ()=>{


    return (
        <div className="otp-form">
            <h2>OTP VERIFICATION</h2>
            <form id="otpForm">
                <input type="text" placeholder="Enter OTP" id="otp" name="otp" required />
                <button type="button">Verify</button>
            </form>
        </div>

    );
}
export default OtpVerify;
