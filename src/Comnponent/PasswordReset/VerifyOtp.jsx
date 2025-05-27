import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
      const { state } = useLocation();

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const email = state?.email;
const navigate = useNavigate();
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if(data.success){
        navigate("/reset-password", { state: { email } });
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to verify OTP.");
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-heading">Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        className="verify-input"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="verify-button" onClick={handleVerifyOtp}>
        Verify
      </button>
      <p className="verify-message">{message}</p>
    </div>
  );
};

export default VerifyOtp;
