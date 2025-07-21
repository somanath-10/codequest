// RazorpayComponent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RazorpayComponent = ({ amount = 300, planName = "Bronze", user }) => {
    const navigate = useNavigate();
    function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

  const loadRazorpay = async (e) => {
    e.preventDefault();
    try {
        console.log("first")
        console.log("id",user.id);
        const res1 = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log("second")
        if(!res1) {
            console.log("RazorPay SDK failed to load");
            return;
        }
        console.log("third")
      // 1. Call backend to create an order
      const res = await fetch("https://codequest-backend-9dso.onrender.com/payment/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:user.id,plan: planName}),
      });

      const data = await res.json();
      console.log(data)
      if (!data.success) return alert(data.message);

      const { id: order_id, currency, amount: orderAmount } = data.order;
      console.log(order_id)
      console.log(currency)
      console.log(orderAmount);


      const options = {
        key: "rzp_test_egyDDk9Tqh3qvA",
        amount: orderAmount,
        currency: "INR",
        name: "Over Flow",
        description: `${planName} Plan Subscription`,
        order_id: order_id,
        handler: async function (response) {
            console.log(response)
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_payment_id)
            console.log(response.razorpay_signature)
          // 3. Send payment info back to backend to verify
          const verifyRes = await fetch("https://codequest-backend-9dso.onrender.com/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan:planName,
              id: user.id,
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment verified & subscription activated");
            navigate("/");
            
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {

          name: user.name,
          email: user.email,
        },
        theme: { color: "#0f9d58" },
      };



      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error.message);
      alert("Payment failed",error.message);
    }
  };

  return (
<button
  onClick={loadRazorpay}
  className="flex mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
>
  Subscribe to {planName} Plan (₹{amount/100})
</button>

  );
};

export default RazorpayComponent;
