import React from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import './Users.css'
import Userslist from './Userslist'
const Users = ({slidein}) => {
  return (
    <div className="home-container-1">
    <Leftsidebar slidein={slidein}/>
    <div  className="home-container-2 pt-16 ml-0 md:ml-[240px] px-4">
        <h1 style={{fontWeight:"400"}}>Users</h1>
        <Userslist/>
        </div>
    </div>
  )
}

export default Users