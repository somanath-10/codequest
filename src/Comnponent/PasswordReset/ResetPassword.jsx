import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const {state} = useLocation();
  const email = state?.email;
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if(data.success){
        navigate('/Auth');
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-heading">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="reset-input"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <p className="reset-message">{message}</p>
    </div>
  );
};

export default ResetPassword;
