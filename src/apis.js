// const REACT_APP_BASE_URL = "https://null-intern-backend-2.onrender.com";
const REACT_APP_BASE_URL = "https://codequest-backend-9dso.onrender.com"

export const endpoints = {
    SEND_OTP: REACT_APP_BASE_URL + "/api/request-otp",
    VERIFY_OTP:REACT_APP_BASE_URL + "/api/verify-otp",
    RESET_PASSWORD:REACT_APP_BASE_URL + "/api/reset-password",
    LOGIN_HISTORY:REACT_APP_BASE_URL+"/user/loginhistory"
}


export const sendFriendRequest = async (fromUserId, toUserId) => {
  const res = await fetch(`${REACT_APP_BASE_URL}/friend/send-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromUserId, toUserId }),
  });
  return res.json();
};

export const getFriendRequests = async (userId) => {
  const res = await fetch(`${REACT_APP_BASE_URL}/friend/requests`,{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({userId}),
  });
  return res.json();
};

export const respondToRequest = async (fromUserId,toUserId) => {
  const res = await fetch(`${REACT_APP_BASE_URL}/friend/accept-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({fromUserId,toUserId }),
  });
  return res.json();
};

export const respondToRequest2 = async (fromUserId,toUserId) => {
  const res = await fetch(`${REACT_APP_BASE_URL}/friend/reject-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({fromUserId,toUserId }),
  });
  return res.json();
};

export const getFriends = async (userId) => {
  const res = await fetch(`${REACT_APP_BASE_URL}/friends/${userId}`);
  return res.json();
};
