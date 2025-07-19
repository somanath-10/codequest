import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setcurrentuser } from "../../action/currentuser";  
import { useDispatch } from "react-redux";
import { endpoints } from "../../apis";
const VerifyOtp = () => {
      const { state } = useLocation();
      const dispatch = useDispatch();
  const {VERIFY_OTP} = endpoints;
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const email = state?.email;
  const success = state?.success;

const navigate = useNavigate();
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${VERIFY_OTP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log(data)
      if(data.success){
        if(success!==false){
            navigate("/reset-password", { state: { email } });
        }
        else{
              dispatch({type:"AUTH",data})
              dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
              navigate("/")
        }
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
