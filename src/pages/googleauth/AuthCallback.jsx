import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    console.log(token);

    const user = jwtDecode(token);
    console.log("user",user);
    if (token) {
        const user = jwtDecode(token);
        console.log("user",user);
      localStorage.setItem("token", token);
      console.log("first");

          const token12 = async()=>{
            const res = await fetch("https://codequest-backend-9dso.onrender.com/user/getuserdetails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token?.token}`,
                "Content-Type": "application/json",
              },
                body: JSON.stringify({ userid:user._id }), // ✅ Sending userId in request body

            });
            if(!res || res?.existingUser === null){
                navigate("/");
            }
                    const response = await res.json();
                    console.log("in payment",response)

                          const profile = {
        token,
        response,
      }
      console.log("second")

      console.log("profile",profile);
console.log("third");
      localStorage.setItem("Profile", JSON.stringify(profile));
      console.log("fourth")
      
        window.location.href="/";
          }

    token12();








      

    } else {
      console.log("token in auth",token)
      navigate("/Auth");
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default AuthCallback;
