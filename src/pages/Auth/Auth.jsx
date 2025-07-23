import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../assets/icon.png'
import Aboutauth from './Aboutauth'
import { signup, login } from '../../action/auth'
import { setcurrentuser } from '../../action/currentuser'
import { UAParser } from 'ua-parser-js'
const Auth = () => {

  const [isVisible, setIsVisible] = useState(false);
const location = useLocation();
  const token = JSON.parse(localStorage.getItem("Profile"));

  const parser = new UAParser();
  const result = parser.getResult();
  const type = result.device.type ||'desktop';
  console.log("desktop",type);

useEffect(() => {
  const token = JSON.parse(localStorage.getItem("Profile"));
  if (token) {
    dispatch(setcurrentuser(token));
    if (location.pathname === '/Auth') {
      navigate('/');
    }
  }
}, []);



  const generatePassword = (length = 5) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    setpassword(newPassword);
  };



    const [issignup, setissignup] = useState(false)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        if (!email && !password) {
            alert("Enter email and password")
        }
        if (issignup) {
            if (!name || !password ||!email) {
                alert("Enter all details to continue")
            }
            else{
                dispatch(signup({ name, email, password }, navigate))
            }
            
        } else {
            
            dispatch(login({ email, password }, navigate))
        
        }
    }
    const handleswitch = () => {
        setissignup(!issignup);
        setname("");
        setemail("");
        setpassword("")

    }

    const handleLogin = () => {
        window.location.href = "https://codequest-backend-9dso.onrender.com/api/auth/google";
    };

    const now = new Date();
    const hour = now.getHours();

    return (
        <section className="auth-section">
            {issignup && <Aboutauth />}
            {
                ((type === "mobile" || type==="Mobile Chrome" || type === "Mobile Safari")&&(hour<10 && hour>13))?(<div>

                    <h1>login in Mobile from 10Am to 1PM</h1>
                </div>):(<div>
                    <div className="auth-container-2">
                        <img src={icon} alt="icon" className='login-logo' />
                        <form onSubmit={handlesubmit}>
                            {issignup && (
                                <label htmlFor="name">
                                    <h4>Display Name</h4>
                                    <input type="text" id='name' name='name' value={name} onChange={(e) => {
                                        setname(e.target.value);
                                    }} />
                                </label>
                            )}
                            <label htmlFor="email">
                                <h4>Email</h4>
                                <input type="email" id='email' name='email' value={email} onChange={(e) => {
                                    setemail(e.target.value);
                                }} />
                            </label>
                        <label htmlFor="password">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h4>Password</h4>
                                {!issignup && (
                                <button onClick={()=>navigate('/request-otp')} className='handle-switch-btn ml-5' style={{ color: "#007ac6", fontSize: "13px" }}>
                                    Forgot Password?
                                </button>
                                )}
                            </div>

                            <div style={{ position: "relative" }}>
                                <input
                                type={isVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                />
                                <button
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#007ac6',
                                    cursor: 'pointer'
                                }}

                                
                                >
                                {isVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <div>
                                
                            </div>
                            {
                                issignup ? (<div className="password-generator" style={{ marginTop: '12px' }}>
                            <h4>Need a strong password?</h4>
                            <button
                            type='button'
                                onClick={() => generatePassword(12)}
                                style={{
                                marginTop: '6px',
                                padding: '8px 16px',
                                backgroundColor: '#007ac6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={e => (e.target.style.backgroundColor = '#005fa3')}
                                onMouseLeave={e => (e.target.style.backgroundColor = '#007ac6')}
                            >
                                Generate Password
                            </button>
                            </div>):(<></>)
                            }
                        </label>
                            <button type='submit' className='auth-btn' >
                                {issignup ? "Sign up" : "Log in"}
                            </button>
                        </form>

                        <button onClick={()=>handleLogin()} className='bg-slate-400 px-4 oy-2 rounded-md mt-5 font-semibold'>
                            CONTINUE WITH GOOGLE
                        </button>
                        
                        <p className=' mt-2'>
                            {issignup ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                                {issignup ? "Log in" : "Sign up"}
                            </button>
                        </p>

                    </div>

                </div>)

                
            }
        </section>
    )
}

export default Auth