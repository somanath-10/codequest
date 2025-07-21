import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import RazorpayComponent from './RazorpayComponent';
import { useSelector } from 'react-redux';
const PricingPage = () => {
    
    const user1 = useSelector((state)=>state.currentuserreducer)
    const token = JSON.parse(localStorage.getItem("Profile"));
    console.log(token.existingUser);

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
          {token?.existingUser?.subscription && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-600">
                {token.existingUser.subscription.plan} Plan
              </h2>

              <div className="text-gray-700">
                <span className="font-medium">Questions Posted Today:</span>{" "}
                {token.existingUser.subscription.questionsPostedToday}
              </div>

              {token.existingUser.subscription.plan === "gold" ? (
                <div className="text-green-600 font-semibold">Unlimited Daily Limit</div>
              ) : (
                <div className="text-gray-700">
                  <span className="font-medium">Daily Limit:</span>{" "}
                  {token.existingUser.subscription.dailyLimit}
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
