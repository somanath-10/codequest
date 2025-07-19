import React from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Rightsidebar from '../../Comnponent/Rightsidebar/Rightsidebar'
import Homemainbar from '../../Comnponent/Homemainbar/homemainbar'
import '../../App.css'

const Home = ({slidein}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2 pt-16 md:ml-[240px]">
        <Homemainbar/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Home