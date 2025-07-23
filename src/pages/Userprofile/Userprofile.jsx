import React, { useState } from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Avatar from '../../Comnponent/Avatar/Avatar'
import Editprofileform from './Edirprofileform'
import Profilebio from './Profilebio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import { sendFriendRequest } from '../../apis'
import { useEffect } from 'react'
const Userprofile = ({ slidein }) => {
const navigate= useNavigate();



  const { id } = useParams()
  const [Switch, setswitch] = useState(false);
  console.log("id",id);
  const users = useSelector((state)=>state.usersreducer)
  console.log(users)


  const currentprofile = users.filter((user) => user._id === id)[0]
  console.log("current profile",currentprofile)



  const currentuser = useSelector((state)=>state.currentuserreducer)
  console.log("current user",currentuser)

if (!currentprofile) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading profile...</p>
    </div>
  )
}

  const handleSend =async() => {
    var fromUserId = currentuser.existingUser._id;
    var toUserId = id;
    const res = await sendFriendRequest(fromUserId, toUserId);
    alert(res.message);
  };
  return (
    <div className="home-container-1 flex min-h-screen bg-gray-100">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2 pt-16 md:ml-[240px]">
        <section className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <Avatar
                  backgroundColor="purple"
                  color="white"
                  fontSize="50px"
                  px="40px"
                  py="30px"
                >
                  {currentprofile.name.charAt(0).toUpperCase()}
                </Avatar>
              </div>          
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">{currentprofile?.name}</h1>
                {/* <p className="text-gray-500 text-sm mt-1">
                  <FontAwesomeIcon icon={faBirthdayCake} className="mr-1 text-pink-500" />
                  Joined {moment(currentprofile?.joinedon).fromNow()}
                </p> */}
              </div>
            </div>
            {currentuser.existingUser._id === id && ( 
              <button className="edit-profile-btn" type='button' onClick={() => setswitch(true)}><FontAwesomeIcon icon={faPen} /> Edit Profile</button>
            )}
          </div>
          {currentuser.existingUser._id !== id && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Send Friend Request</h3>
              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
              >
                Send Request
              </button>
            </div>
          )}
          <>
            {Switch ? (
              <Editprofileform currentuser={currentuser} setswitch={setswitch} />
            ) : (
              <Profilebio currentprofile={currentprofile} />
            )}
          </>
        </section>
      </div></div>
  )
}

export default Userprofile