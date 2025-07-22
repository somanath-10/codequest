import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../assets/icon.png'
import Aboutauth from './Aboutauth'
import { signup, login } from '../../action/auth'
const Auth = () => {

  const [isVisible, setIsVisible] = useState(false);

  const token = JSON.parse(localStorage.getItem("Profile"));

  useEffect(()=>{
    if(token){
        navigate('/');
    }
  },[])
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
            if (!name) {
                alert("Enter a name to continue")
            }
            dispatch(signup({ name, email, password }, navigate))
            
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

    return (
        <section className="auth-section">
            {issignup && <Aboutauth />}
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
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4>Password</h4>
                        {!issignup && (
                        <button onClick={()=>navigate('/request-otp')} className='handle-switch-btn' style={{ color: "#007ac6", fontSize: "13px" }}>
                            Forgot Password?
                        </button>
                        )}
                    </div>
                <label htmlFor="password">

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
                            right: 10,
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
                    {
                        issignup ? (<div className="password-generator" style={{ marginTop: '12px' }}>
                    <h4>Need a strong password?</h4>
                    <button
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

                <button onClick={()=>handleLogin()}>
                    CONTINUE WITH GOOGLE
                </button>
                
                <p>
                    {issignup ? "Already have an account?" : "Don't have an account"}
                    <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                        {issignup ? "Log in" : "Sign up"}
                    </button>
                </p>

            </div>
        </section>
    )
}

export default Auth