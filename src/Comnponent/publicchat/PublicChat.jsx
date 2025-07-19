import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar/Leftsidebar";
import { useNavigate } from "react-router-dom";

const PublicChat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("Profile"));
  console.log("profilw",profile)
  if(profile===null){
      navigate('/');
  }
  const token = profile?.token;
  const userId = profile?.existingUser._id;

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  console.log("messages",messages);

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/public-chat", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data.messages);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data.users);
  };

  const sendMessage = async () => {
    if (!text) return;
    await fetch("http://localhost:5000/public-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text,userId }),
    });
    setText("");
    fetchMessages();
  };

  return (
    <div className="flex h-screen">
      {/* Left: User List */}
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
      <Leftsidebar/>
      </div>

      {/* Right: Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages && messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-2 flex ${
                msg.sender._id === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-sm ${
                  msg.sender._id === userId
                    ? "bg-green-500 text-white"
                    : "bg-white text-black border"
                }`}
              >
                <strong>{msg.sender.name}:</strong> {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white flex items-center border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicChat;
