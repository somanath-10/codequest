import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
    console.log(token)
    if (token) {
        const user = jwtDecode(token); // this gives you the user object from the token
        console.log("user",user);
      localStorage.setItem("token", token);
      console.log("first");
      const profile = {
        token,
        existingUser:user,
      }
      console.log("second")

      console.log("profile",profile);
console.log("third");
      localStorage.setItem("Profile", JSON.stringify(profile));
      console.log("fourth")
      
      window.location.href="/";

    } else {
      console.log("token in auth",token)
      navigate("/");
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default AuthCallback;
