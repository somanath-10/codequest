import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../apis";
import { useSelector } from "react-redux";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
const LoginHistoryPage = () => {
    const{LOGIN_HISTORY} = endpoints;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const user = useSelector((state)=>state.currentuserreducer)

useEffect(() => {
  const fetchLoginHistory = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Profile"));
      console.log(token.existingUser._id);
      const response = await fetch(`${LOGIN_HISTORY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token?.existingUser._id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setHistory(data.loginHistory);
      } else {
        setError("Failed to fetch login history.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching login history.");
    } finally {
      setLoading(false);
    }
  };

  fetchLoginHistory();
}, []);


  if (loading) return <p>Loading login history...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (

    <div className="flex min-h-screen bg-gray-100">
      <Leftsidebar/>
      <div  className="flex-1 px-6 py-10 md:ml-[250px]">
        <h2>Login History</h2>
        {history.length === 0 ? (
          <p>No login history found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={thStyle}>Browser</th>
                <th style={thStyle}>Operating System</th>
                <th style={thStyle}>Device Type</th>
                <th style={thStyle}>IP Address</th>
                <th style={thStyle}>Login Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map(({ _id, browser, os, deviceType, ip, time }) => (
                <tr key={_id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{browser || "Unknown"}</td>
                  <td style={tdStyle}>{os || "Unknown"}</td>
                  <td style={tdStyle}>{deviceType || "Unknown"}</td>
                  <td style={tdStyle}>{ip || "Unknown"}</td>
                  <td style={tdStyle}>
                    {new Date(time).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "10px 15px",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "8px 15px",
};

export default LoginHistoryPage;
