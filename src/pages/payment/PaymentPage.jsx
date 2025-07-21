import { useEffect, useState } from 'react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import RazorpayComponent from './RazorpayComponent';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PricingPage = () => {
    
    const user1 = useSelector((state)=>state.currentuserreducer)
    console.log(token.existingUser);
    
    
    const navigate = useNavigate();
    const[token1,settoken1] = useState();
    useEffect(()=>{
  const token = JSON.parse(localStorage.getItem("Profile"));

    const token12 = async()=>{
        const res = await fetch("https://codequest-backend-9dso.onrender.com/user/getuserdetails", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`, // if required
    "Content-Type": "application/json",
  },
    body: JSON.stringify({ userid:token?.existingUser._id }), // ✅ Sending userId in request body

  credentials: "include", // if you're using cookies
});
        if(!res || res?.existingUser === null){
          navigate("/");
        }
        console.log("in payment",res)
        settoken1(res.json());

    }

    token12();
},[])
    
    const user = {
      id: token.existingUser._id,
      name: token.existingUser.name,
      email: token.existingUser.email,
    };

  return (

    <div>
      <div>
        <Leftsidebar/>
      </div>
      <div className='pt-16 md:ml-[240px]'>


              <div>
                <h2>Select a Plan</h2>
                <RazorpayComponent amount={10000} planName="bronze" user={user} />
                <RazorpayComponent amount={30000} planName="silver" user={user} />
                <RazorpayComponent amount={100000} planName="gold" user={user} />
              </div>

        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
          {token1?.existingUser?.subscription && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-600">
                {token1.existingUser.subscription.plan} Plan
              </h2>

              <div className="text-gray-700">
                <span className="font-medium">Questions Posted Today:</span>{" "}
                {token1.existingUser.subscription.questionsPostedToday}
              </div>

              {token1.existingUser.subscription.plan === "gold" ? (
                <div className="text-green-600 font-semibold">Unlimited Daily Limit</div>
              ) : (
                <div className="text-gray-700">
                  <span className="font-medium">Daily Limit:</span>{" "}
                  {token1.existingUser.subscription.dailyLimit}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default PricingPage;
