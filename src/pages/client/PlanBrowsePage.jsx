// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // This function loads the Razorpay script
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// function PlanBrowsePage() {
//   const [plans, setPlans] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/public/plans",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setPlans(response.data.data);
//       } catch (error) {
//         toast.error("Could not fetch plans.");
//       }
//     };
//     fetchPlans();
//   }, [token]);

//   const handleSubscribe = async (plan) => {
//     const scriptLoaded = await loadRazorpayScript();
//     if (!scriptLoaded) {
//       toast.error("Could not load payment gateway. Please try again.");
//       return;
//     }

//     try {
//       // Step 1: Initiate payment and get Razorpay order details
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/payments/initiate-subscription",
//         { plan_id: plan.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const { razorpay_order_id, amount, key_id, user } = response.data.data;

//       // Step 2: Open Razorpay Checkout modal
//       const options = {
//         key: key_id,
//         amount: amount,
//         name: "Carwash Subscription",
//         description: `Payment for ${plan.name}`,
//         order_id: razorpay_order_id,
//         handler: async function (response) {
//           // Step 3: Verify payment AND create the subscription
//           try {
//             // First, verify the payment signature
//             await axios.post(
//               "http://127.0.0.1:8000/api/payments/verify",
//               {
//                 ...response,
//                 // Note: We don't have a local order_id yet for subscriptions
//               },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );

//             // If verification is successful, create the subscription
//             await axios.post(
//               "http://127.0.0.1:8000/api/subscriptions",
//               { plan_id: plan.id },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );

//             toast.success("Subscription successful!");
//             navigate("/subscriptions"); // Redirect to their subscriptions page
//           } catch (verifyError) {
//             toast.error("Payment verification failed.");
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email,
//           contact: user.phone,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (initError) {
//       toast.error("Failed to initiate subscription payment.");
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Browse Subscription Plans</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className="bg-white p-6 rounded-lg shadow-md flex flex-col"
//           >
//             <h2 className="text-xl font-bold">{plan.name}</h2>
//             <p className="text-sm text-gray-500 mb-4">by {plan.vendor.name}</p>
//             <p className="text-gray-700 mb-4">{plan.description}</p>
//             <div className="mt-auto">
//               <p className="text-2xl font-bold mb-2">₹{plan.price}</p>
//               <p className="text-gray-600">
//                 {plan.service_limit} washes / {plan.duration_days} days
//               </p>
//               <button
//                 onClick={() => handleSubscribe(plan)}
//                 className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 Subscribe Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlanBrowsePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// This function loads the Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function PlanBrowsePage() {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/public/plans",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlans(response.data.data);
      } catch (error) {
        toast.error("Could not fetch plans.");
      }
    };
    fetchPlans();
  }, [token]);

  const handleSubscribe = async (plan) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Could not load payment gateway. Please try again.");
      return;
    }

    try {
      // Step 1: Initiate payment and get Razorpay order details
      const response = await axios.post(
        "http://127.0.0.1:8000/api/payments/initiate-subscription",
        { plan_id: plan.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpay_order_id, amount, key_id, user } = response.data.data;

      // Step 2: Open Razorpay Checkout modal
      const options = {
        key: key_id,
        amount: amount,
        name: "Carwash Subscription",
        description: `Payment for ${plan.name}`,
        order_id: razorpay_order_id,
        handler: async function (response) {
          // Step 3: Verify payment AND create the subscription
          try {
            // First, verify the payment signature
            await axios.post(
              "http://127.0.0.1:8000/api/payments/verify",
              {
                ...response,
                // Note: We don't have a local order_id yet for subscriptions
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // If verification is successful, create the subscription
            await axios.post(
              "http://127.0.0.1:8000/api/subscriptions",
              { plan_id: plan.id },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Subscription successful!");
            navigate("/subscriptions"); // Redirect to their subscriptions page
          } catch (verifyError) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#0046FF",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (initError) {
      toast.error("Failed to initiate subscription payment.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Browse Subscription Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {plan.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              by {plan.vendor.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {plan.description}
            </p>
            <div className="mt-auto">
              <p className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                ₹{plan.price}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {plan.service_limit} washes / {plan.duration_days} days
              </p>
              <button
                onClick={() => handleSubscribe(plan)}
                className="w-full mt-4 px-4 py-2 font-bold text-white bg-brand-blue rounded-md hover:bg-blue-700"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanBrowsePage;
