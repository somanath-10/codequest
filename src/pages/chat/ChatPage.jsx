import React, { useEffect, useState } from 'react';

const WhatsAppStyleChat = () => {
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    useEffect(() => {
        fetchChats();
    }, []);
      useEffect(() => {    
        if (activeChat?._id) {
          fetchMessages(activeChat._id);
        }
      }, [activeChat]);

  const profile = JSON.parse(localStorage.getItem("Profile"));
  const token = profile?.token;

  if (!token) {
    return <div className="text-red-600 p-4">Please login to access chat.</div>;
  }

  const userId = profile?.existingUser?._id;

  // Fetch user chats
  const fetchChats = async () => {
    try {
      const res = await fetch(`https://codequest-backend-9dso.onrender.com/chat/chats`, {
        headers: { Authorization: `Bearer ${token}` },
        body:JSON.stringify({userid:profile?.existingUser._id})
      });
      const data = await res.json();
      setChats(data.chats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  // Fetch messages for a chat
  const fetchMessages = async (chatId) => {
    try {
      const res = await fetch(`https://codequest-backend-9dso.onrender.com/chat/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // On mount

  // On active chat change

  // Create or reuse chat with user
  const openChat = async (otherUserId) => {
    try {
      const res = await fetch(`https://codequest-backend-9dso.onrender.com/chat/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userid:profile?.existingUser._id , otherUserId }),
      });
      const data = await res.json();
      setActiveChat(data.chat);
    } catch (error) {
      console.error("Failed to open chat:", error);
    }
  };

  console.log(profile);
  // Send message
  const send = async () => {
    if (!text || !activeChat) return;
    try {
      await fetch(`https://codequest-backend-9dso.onrender.com/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userid:profile?.existingUser._id,chatId: activeChat._id, text }),
      });
      setText("");
      fetchMessages(activeChat._id);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
        <h2 className="p-4 text-xl font-bold">Chats</h2>
            {profile?.existingUser?.friends?.map(friend => (
            <div
                key={friend._id}
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => openChat(friend._id)}
            >
                {friend.name}
            </div>
            ))}

      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex-none p-4 border-b bg-white text-lg font-semibold">
          {activeChat ?
            activeChat.members.find((m) => m._id !== userId)?.name :
            "Select a chat"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-2 flex ${msg.sender === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow text-white ${
                  msg.sender === userId ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        {activeChat && (
          <div className="flex-none p-4 border-t bg-white flex items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full mr-2"
            />
            <button
              onClick={send}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppStyleChat;
