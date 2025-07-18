import React ,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import bars from '../../assets/bars-solid.svg'
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/Avatar';
import './navbar.css';
import {setcurrentuser} from '../../action/currentuser'
import {jwtDecode} from "jwt-decode"
function Navbar({ handleslidein }) {
    var User = useSelector((state)=>state.currentuserreducer)
    // console.log(User)
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const handlelogout=()=>{
        dispatch({type:"LOGOUT"})
        navigate("/")
        dispatch(setcurrentuser(null))
    }

    useEffect(()=>{
        const token =User?.token;
        if(token){
            const decodedtoken=jwtDecode(token);
            if(decodedtoken.exp * 1000 < new Date().getTime()){
                handlelogout();
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    },[User?.token,dispatch]);
    return (
        <nav className="main-nav">
            <div className="navbar">

                <div className="navbar-1">
                    <Link to='/' className='nav-item nav-logo'>
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                        About
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                        Products
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                        For Teams
                    </Link>
                    <form><input type="text" placeholder='Search...' />
                        <img src={search} alt="search" width='18' className='search-icon' />
                    </form>
                </div>
                <div className="navbar-2">
                    {User === null ? (
                        <Link to='/Auth' className='nav-item nav-links'>
                            Log in
                        </Link>
                    ) : (
                        < >
                            <button onClick={()=>navigate("/chat")}>Chat with friends</button>
                            <button className="nav-tem ml-2 nav-links" onClick={handlelogout}>Log out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar