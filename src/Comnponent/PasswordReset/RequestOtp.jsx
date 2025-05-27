import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../apis";
import "./RequestOtp.css"; // <-- make sure this path matches your file structure

const { SEND_OTP } = endpoints;

const RequestOtp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    try {
      const response = await fetch(`${SEND_OTP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate("/verify-otp", { state: { email } });
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">Request OTP</h2>
      <input
        className="otp-input"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="otp-button" onClick={handleRequestOtp}>
        Send OTP
      </button>
      <p className="otp-message">{message}</p>
    </div>
  );
};

export default RequestOtp;
