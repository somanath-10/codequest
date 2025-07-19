import React from 'react'
import './Leftsidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Globe from "../../assets/Globe.svg"
import { useState } from 'react'
import bars from '../../assets/bars-solid.svg'

const Leftsidebar = ({}) => {
  const navigate = useNavigate();
  const slideinstyle = {
    transform: "translateX(0%)",
  };
  const slideoutstyle = {
    transform: "translateX(-100%)",
  }
  const [slidein, setSlidein] = useState(false); // internal state

  
  return (

    <>
        <button
        onClick={() => setSlidein(!slidein)}
        className="fixed top-4 left-4 z-30 text-white rounded-md md:hidden"
      >
        <img src={bars} alt="bars" width='15' />
      </button>
    <div
      className={`fixed top-16 left-0 z-20 h-[calc(100vh-64px)] w-[240px] bg-white transform transition-transform duration-300
        ${slidein ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0`}
    >


      <nav className='side-nav'>
        <button className="nav-btnn">
          <NavLink to='/' className="side-nav-links" activeclassname='active'>
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div style={{cursor:'pointer'}}>
            <p onClick={()=>navigate('/post')}>PUBLIC</p>
          </div>
          <button className='nav-btnn'>
            <NavLink to='/Question' className='side-nav-links' activeclassname='active'>
            <img src={Globe} alt="globe" />
            <p style={{paddingLeft:'10px'}}>Questions</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >Tags</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >Users</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/login-history' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >Login history</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/requests' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p>Requests</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/public-chat' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p>Public Chat</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/payment' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p>Subscription</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Leftsidebar