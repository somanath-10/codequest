import React, { useEffect, useState } from 'react'
import { getFriendRequests, respondToRequest2 } from '../../apis'
import { respondToRequest } from '../../apis';
import { useNavigate } from 'react-router-dom';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';

function AcceptReq() {
    const navigate = useNavigate();
    const [currentuser,setCurrentUSer] =useState({});
    const[requests,setRequests] = useState({});
    console.log("requests",requests);

    const handlerequests = async(userId)=>{
    console.log("userId",userId)
        
          const res1 = await fetch(`https://codequest-backend-9dso.onrender.com/friend/requests`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({userId:userId}),
          });
          const data = await res1.json();
          console.log("res1",data);
          setRequests(data)
        
    }
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("Profile"));

        if(user===null){
            alert("Login is required");
            navigate("/Auth");
        }
        setCurrentUSer(user);
        console.log("user",user);
        console.log(user?.existingUser._id);
        handlerequests(user?.existingUser._id);
    },[])
    const sentRequests = requests?.user?.sentRequests|| [];
  const receivedRequests =requests?.user?.receivedRequests|| [];


  const acceptafriend = async(fromUserId)=>{
    const toUserId = currentuser?.existingUser?._id;
    const response = await respondToRequest(fromUserId,toUserId);
    console.log("responce of accept friend",response);
    alert("friend request accepted");
    handlerequests(currentuser?.existingUser._id);
  }

  const rejectafriend = async(fromUserId)=>{
    const toUserId = currentuser?.existingUser?._id;

    const responce = await respondToRequest2(fromUserId,toUserId);
    console.log("rejected a friend",responce);
    alert("friend is rejected")
    handlerequests(currentuser?.existingUser._id);

  }

  return (

    <div className="flex min-h-screen bg-gray-100">
      <Leftsidebar/>
      <div className="p-4 space-y-6 flex-1 px-6 py-10 md:ml-[250px]">
        {/* Sent Requests */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Sent Friend Requests</h2>
          {sentRequests.length === 0 ? (
            <p className="text-gray-500">No sent requests</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {sentRequests.map((req) => (
                <li key={req._id}>
                  <span className="font-medium">{req.name}</span> (<code>{req._id}</code>)
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Received Requests */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Received Friend Requests</h2>
          {receivedRequests.length === 0 ? (
            <p className="text-gray-500">No received requests</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {receivedRequests.map((req) =>
                typeof req === "object" ? (
                  <li key={req._id}>
                    <span className="font-medium">{req.name}</span> (<code>{req._id}</code>)<button onClick={()=>acceptafriend(req._id)}>Accept</button>
                    {" "}
                    <button onClick={()=>rejectafriend(req._id)}>Reject</button>
                  </li>
                ) : (
                  <li key={req}>
                    <span className="font-medium">User ID:</span> <code>{req}</code>
                      

                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AcceptReq