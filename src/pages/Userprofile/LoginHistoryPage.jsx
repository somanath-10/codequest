import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
import { endpoints } from "../../apis";

const LoginHistoryPage = () => {
  const { LOGIN_HISTORY } = endpoints;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.currentuserreducer);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("Profile"));
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
        setError("An error occurred while fetching login history.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoginHistory();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading login history...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Leftsidebar />
      <div className="flex-1 px-6 py-10 md:ml-[250px]">
        <h2 className="text-2xl font-semibold mb-6">Login History</h2>
        {history.length === 0 ? (
          <p>No login history found.</p>
        ) : (
          <div className="overflow-auto rounded shadow-lg bg-white">
            <table className="min-w-full text-left text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3 border-b">Browser</th>
                  <th className="px-5 py-3 border-b">Operating System</th>
                  <th className="px-5 py-3 border-b">Device Type</th>
                  <th className="px-5 py-3 border-b">IP Address</th>
                  <th className="px-5 py-3 border-b">Login Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map(({ _id, browser, os, deviceType, ip, time }) => (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 border-b">{browser || "Unknown"}</td>
                    <td className="px-5 py-3 border-b">{os || "Unknown"}</td>
                    <td className="px-5 py-3 border-b">{deviceType || "Unknown"}</td>
                    <td className="px-5 py-3 border-b">{ip || "Unknown"}</td>
                    <td className="px-5 py-3 border-b">
                      {new Date(time).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistoryPage;
