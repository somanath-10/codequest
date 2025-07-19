import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
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
      navigate("/");

    } else {
      navigate("/Auth");
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default AuthCallback;
